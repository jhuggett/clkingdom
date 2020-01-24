import * as inquirer from "inquirer"
import * as chalk from "chalk"
var clear = require('clear');
const fs = require("fs")

import { goBack } from "../commonCMD.json"


import { startGame } from "../Game/game"







export async function goToLoadGame() {
    clear()
    console.log(
        chalk.yellow.bold(
            "Load Game"
        )
    )

    var message = "Select a save:"
    
    var options: Array<string> = fs.readdirSync("./data/")

    
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
                break
            }
        }
    })


}
