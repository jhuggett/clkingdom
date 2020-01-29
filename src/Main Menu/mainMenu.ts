import * as inquirer from "inquirer"
import * as chalk from "chalk"

import * as jsonPackage from "../../package.json";

var figlet = require('figlet');
var clear = require('clear');

import { startGame } from "../Game/game"

import { goToOptions } from "./options"

import { goToLoadGame } from "./loadGame"


function checkForSaves() {
    // todo
    return false
}



async function mainMenu() {
    const questions = []
    questions.push({
        type: "list",
        name: "choice",
        message: chalk.yellow.bold("Main Menu"),
        choices: ["New Game", "Load Game", "Options", "Quit"],
        default: "New Game"
    })
    const answers = await inquirer.prompt(questions)
    return answers.choice
}

export async function beginCLI(options) {
    
    if (options.newGame) {
        startGame()
        return null
    }
    

    var loopAgain = true

    while (loopAgain) {
        clear()
        
        console.log(
            chalk.red.bold.dim(
                figlet.textSync('CL Kingdom', { horizontalLayout: 'full', font: "Small Slant" })
                )
        );

        console.log(
            chalk.blue.bold.italic(
                "Vers. " + jsonPackage.version
            )
        );
            

        const choice = await mainMenu()
    
        switch(choice) {
            case "New Game": {
                await startGame()
                break
            }

            case "Load Game": {
                await goToLoadGame()
                break
            }

            case "Options": {
                await goToOptions();
                break
            }

            case "Quit": {
                clear()
                console.log(
                    chalk.green.bold.dim(
                        "Be bidded adieu..."
                        )
                );
                loopAgain = false
                break
            }

            default: {
                break
            }
        }
    


    }
}

