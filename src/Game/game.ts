import * as inquirer from "inquirer"
var clear = require('clear');

import { saveGame } from "../Save/saveGame"

import { GameHandler } from "./GameHandler"
import { Kingdom } from "./Kingdom"
import { Settlement } from "./Settlement"

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

export async function startGame() {
    clear()

    const newGame = await confirmNewGame()
    if (!newGame) {
        return
    } 

    clear()
    await inquirer.prompt([
        {
            name: "settlementName",
            message: "Settlement Name:",
            validate: async input => {
                if (input === "") {
                    return "A name is required!"
                }
                return true
            }
        }
    ])
    .then(async answers => {
        const newSettlement = new Settlement(answers.settlementName)
        const newKingdom = new Kingdom()
        newKingdom.settlements.push(newSettlement)
        newKingdom.name = newSettlement.name
        const gameHandler = new GameHandler(newKingdom)
        
        await saveGame(gameHandler)


    })

}