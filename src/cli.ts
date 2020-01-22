import * as arg from "arg"
import * as inquirer from "inquirer"
import * as chalk from "chalk"

var figlet = require('figlet');
var clear = require('clear');

import { startGame } from "./game"

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            "--new": Boolean,
            "-n": "--new"
        },
        {
            argv: rawArgs.slice(2)
        }
    )
    return {
        newGame: args["--new"] || false
    }
}

function checkForSaves() {
    // todo
    return false
}

async function confirmNewGame() {
    const questions = []
    questions.push({
        type: "confirm",
        name: "confirmNewGame",
        message: "Start a new game ?",
        default: false,
    })

    const answers = await inquirer.prompt(questions)
    return answers.confirmNewGame
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

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args)
    
    

    if (options.newGame) {
        if (await confirmNewGame()) {
            console.log("Starting new game...");
            
            return null
        }
    }
    

    var loopAgain = true

    while (loopAgain) {
        clear()
        console.log(
            chalk.red(
                figlet.textSync('CL Kingdom', { horizontalLayout: 'full', font: "Small Slant" })
                )
        );

        const choice = await mainMenu()
    
        switch(choice) {
            case "New Game": {
                await startGame()
                break
            }

            case "Quit": {
                console.log("Goodbye...")
                loopAgain = false
                break
            }

            default: {
                break
            }
        }
    


    }
}