import * as inquirer from "inquirer"
var clear = require('clear');

import { saveGame } from "../Save/saveGame"

import { GameHandler } from "./GameHandler"
import { Kingdom } from "./Kingdom"
import { Settlement } from "./Settlement"

import { begin } from "./Main Loop/begin"
import Terminal from "../Terminal";

async function confirmNewGame() {
    return await Terminal.confirm("Begin a new game?")
}

export async function startGame() {
    clear()

    const newGame = await confirmNewGame()
    if (!newGame) {
        return
    } 

    Terminal.clear()

    const newSettlement = new Settlement(await Terminal.inputLine("Settlement Name"))

    const newKingdom = new Kingdom()
    newKingdom.settlements.push(newSettlement)
    newKingdom.name = newSettlement.name
    const gameHandler = new GameHandler(newKingdom, 0, 0)
        
    await saveGame(gameHandler)

    await begin(gameHandler)

}