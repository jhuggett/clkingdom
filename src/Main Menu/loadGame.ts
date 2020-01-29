import * as inquirer from "inquirer"
import * as chalk from "chalk"
var clear = require('clear');
const fs = require("fs")

import { goBack } from "../commonCMD.json"

import { prefixPath } from "../../path.json"

import { startGame } from "../Game/game"

import { confirm } from "../Misc/confirm"


async function identifyManifest(save, manifests) {
    return manifests.find((manifest) => { return manifest.displayData == save});
}

async function interactWith(save, manifests) {
    const manifest = await identifyManifest(save, manifests)

    const options = ["Load", "Delete", goBack]

    await inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "Select an option: ",
            choices: options
        }
    ])
    .then(async answers => {
        switch (answers.selection) {
            case goBack: {
                await goToLoadGame()
                return
            }

            case "Load": {
                //todo
                await goToLoadGame()
                return
            }

            case "Delete": {
                if (await confirm("Delete this save ?")) {
                    console.log("data/" + manifest.id);
                    
                    fs.rmdirSync(prefixPath + "data/" + manifest.id, { recursive: true });

                    await goToLoadGame()
                    return 
                }
            }

            default: {
                await goToLoadGame()
            }
        }
    })

}


export async function goToLoadGame() {
    clear()
    console.log(
        chalk.yellow.bold(
            "Load Game"
        )
    )

    var message = "Select a save:"
    
    var options: Array<string> = []
    var manifests = []
    
    try {
        
        const saves = fs.readdirSync(prefixPath + "data/")

        for await (const id of saves) {
            
            const data = getManifestData(id)
            manifests.push(data)
        }
        
        
        manifests = manifests.sort((a, b) => {
            return b.createdOn - a.createdOn
        })
        
        for (const manifest of manifests) {
            options.push(manifest.displayData)
        }
        
    } catch (error) {
        //console.log(error);
    }
    

    
    if (options.length == 0) { // todo: check if no availible saves 
        message = "No availible save..."
        options = ["Start new game", goBack]
    } else {
        options.push(goBack)
    }
    
    await inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: message,
            choices: options
        }
    ])
    .then(async answers => {
        switch (answers.selection) {
            case goBack: {
                return
            }

            case "Start new game": {
                await startGame()
                break
            }

            default: {
                await interactWith(answers.selection, manifests)
            }
        }
    })


}

function getManifestData(id: String) {
    try {
        var obj = JSON.parse(fs.readFileSync(prefixPath + "data/" + id + "/manifest.json"))

        
        //var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const display = new Date(obj.createdOn).toLocaleString("en-US")

        return {
            id: obj.id,
            name: obj.name,
            createdOn: obj.createdOn,
            displayData: obj.name + " (" + display + ")"
        }
    } catch (error) {
        
        return {
            id: id,
            name: "Manifest Missing",
            createdOn: "Unknown Date",
            displayData: obj.name + " (" + obj.createdOn + ")"
        }
    }
    
}