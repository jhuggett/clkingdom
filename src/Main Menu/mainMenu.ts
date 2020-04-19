import * as inquirer from "inquirer"
import * as chalk from "chalk"

import * as jsonPackage from "../../package.json";

import Terminal from "../Terminal"

import test from "../Testing"

import { startGame } from "../Game/game"

import { goToOptions } from "./options"

import { goToLoadGame } from "./loadGame"
import Snake from "../Testing/Snake.js";


function checkForSaves() {
    // todo
    return false
}



async function mainMenu() {
    return await Terminal.listOfChoices(Terminal.decoration.bold(
        Terminal.color.yellow(
            "Main Menu:"
        )
    ), ["New Game", "Load Game", "Options", "Test", "Snake"], "Quit")
}

export async function beginCLI(options) {
    
    if (options.newGame) {
        startGame()
        return null
    }
    

    var loopAgain = true

    while (loopAgain) {
        Terminal.clear()

        if (Terminal.getWidth() < 45) {
            Terminal.writeOnNewLine(
                Terminal.color.green(
                    Terminal.decoration.bold(
                        "CL Kingdom"
                    )
                )
            )
        } else {

            Terminal.write(Terminal.color.blue("    _                                   _"))
            Terminal.newLine()
            Terminal.write(Terminal.color.red("   ( )                                 ( )"))
            Terminal.newLine()
            Terminal.write(Terminal.color.green("  ( _ )   ________ ___      __   __   ( _ )"))
            Terminal.newLine()
            Terminal.write(Terminal.color.yellow("   |X|    | _____| | |      | | / /    |X|"))
            Terminal.newLine()
            Terminal.write(Terminal.color.blue("   |X|    | |      | |      | |/ /     |X|"))
            Terminal.newLine()
            Terminal.write(Terminal.color.red("   |X|    | |      | |      |   /      |X|"))
            Terminal.newLine()
            Terminal.write(Terminal.color.green("[=======] | |      | |      |   \\   [=======]"))
            Terminal.newLine()
            Terminal.write(Terminal.color.yellow("  | | |   | |      | |      | |\\ \\    | | |"))
            Terminal.newLine()
            Terminal.write(Terminal.color.blue("  | | |   | |____  | |____  | | \\ \\   | | |"))
            Terminal.newLine()
            Terminal.write(Terminal.color.red("  | | |   |______| |______| |_|  \\_\\  | | |"))
            Terminal.newLine()
            // Terminal.write(Terminal.color.green("  | | |                               | | | "))
            // Terminal.newLine()
            // Terminal.write(Terminal.color.yellow("  | | |                               | | | "))
            // Terminal.newLine()
            // Terminal.write(Terminal.color.blue("  | | |                               | | | "))
            // Terminal.newLine()
            // Terminal.write(Terminal.color.red("  | | |                               | | | "))
            // Terminal.newLine()
            // Terminal.write(Terminal.color.green("  | | |                               | | | "))
            // Terminal.newLine()
            Terminal.write(Terminal.color.yellow("  \\ | /                               \\ | /"))
            Terminal.newLine()
            Terminal.write(Terminal.color.blue("   \\ /                                 \\ /"))
            Terminal.newLine()
            Terminal.write(Terminal.color.red("    V                                   V"))
        }
        Terminal.newLine()
        Terminal.writeOnNewLine(
            Terminal.color.blue(
                Terminal.decoration.bold(
                    "Vers. " + jsonPackage.version
                )
            )
        )
        Terminal.newLine()

        
            

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
                Terminal.clear()
                Terminal.writeOnNewLine(
                    Terminal.color.green(
                        Terminal.decoration.bold(
                            "Be bidded adieu..."
                        )
                    )
                )
                
                loopAgain = false
                break
            }

            case "Test": {
                await test()
                break
            }

            case "Snake": {
                await Snake()
                break
            }

            default: {
                break
            }
        }
    


    }
}

