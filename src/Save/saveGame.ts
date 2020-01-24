var mkdirp = require("mkdirp")
const jsonfile = require('jsonfile')

import { GameHandler } from "../Game/GameHandler"
import { Kingdom } from "../Game/Kingdom"
import { Settlement } from "../Game/Settlement"

function checkForDataFolder() {
    mkdirp("data", function (err) {
        if (err) console.error(err)
    })
}

function checkForSaveFolder(id: String) {
    mkdirp("data/" + id, function (err) {
        if (err) console.error(err)
    })
}

function writeKingdomData(kingdom: Kingdom) {
    const data = {
        id: kingdom.id
    }
    const file = "data/" + kingdom.id + "/kingdom.json"

    jsonfile.writeFile(file, data, err => {
        if (err) console.error(err)
    })
}

export async function saveGame(gameHandler: GameHandler) {
    console.log("Saving game...");
    
    checkForDataFolder()
    checkForSaveFolder(gameHandler.kingdom.id)
    writeKingdomData(gameHandler.kingdom)

}