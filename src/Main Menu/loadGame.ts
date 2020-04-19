import * as inquirer from "inquirer"
import * as chalk from "chalk"
var clear = require('clear');
const fs = require("fs")

import { goBack } from "../commonCMD.json"

import { prefixPath } from "../path.json"

import { startGame } from "../Game/game"

import { confirm } from "../Misc/confirm"

import { loadGame } from "../Save/loadGame"

import { continueGame } from "../Game/Main Loop/begin"
import Terminal from "../Terminal/index.js";

async function identifyManifest(save, manifests) {
    return manifests.find((manifest) => { return manifest.displayData == save});
}

async function interactWith(save, manifests) {
    Terminal.write(
        Terminal.color.blue(
            Terminal.decoration.bold(
                save
            )
        )
    )

    Terminal.newLine()
    const manifest = await identifyManifest(save, manifests)

    const answer = await Terminal.listOfChoices(Terminal.decoration.bold(
        Terminal.color.yellow(
            "Select an option:"
        )
    ), ["Load", "Delete"], goBack)


    switch (answer) {
        case goBack: {
            await goToLoadGame()
            return
        }

        case "Load": {
            const context = loadGame(manifest.id)
            await continueGame(context)
            return
        }

        case "Delete": {
            Terminal.clear()
            if (await Terminal.confirm("Delete this save?")) {
                Terminal.clear() 
                try {
                    fs.rmdirSync(prefixPath + "data/" + manifest.id, { recursive: true });
                    Terminal.writeWithNewLine("Successfully deleted!")
                } catch (e) {
                    Terminal.writeWithNewLine("Failed to delete: " + e.message)
                }
                
                Terminal.newLine()
                await Terminal.pressAnyKeyToContinue()

                await goToLoadGame()
                return 
            }
        }

        default: {
            await goToLoadGame()
        }
    }

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
        options = ["Start new game"]
    }

    const answer = await Terminal.listOfChoices(Terminal.decoration.bold(
        Terminal.color.yellow(
            message
        )
    ), options, goBack)

    
    
    switch (answer) {
        case goBack: {
            return
        }

        case "Start new game": {
            await startGame()
            break
        }

        default: {
            Terminal.clear()
            await interactWith(answer, manifests)
        }
    }
    


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