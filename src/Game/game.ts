import * as inquirer from "inquirer"
var clear = require('clear');

import { saveGame } from "../Save/saveGame"

import { GameHandler } from "./Classes/GameHandler"
import { Kingdom } from "./Classes/Persistant/Kingdom"
import { Settlement } from "./Classes/Persistant/Settlement"

import { begin } from "./Main Loop/begin"
import Terminal from "../Terminal";
import { GrowthMap } from "../Maps/GrowthMap";
import GameMap from "./Classes/Persistant/GameMap";

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

    Terminal.clear()
    Terminal.write(
        Terminal.decoration.bold(
            Terminal.color.blue(
                "Generating map..."
            )
        )
    )

    const growthMap = new GrowthMap()
    growthMap.growToSize(5000)

    const gameHandler = new GameHandler(newKingdom, 0, 0, new GameMap(growthMap))
        
    await saveGame(gameHandler)

    await begin(gameHandler)

}