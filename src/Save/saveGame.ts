import fs = require("fs")

import { GameHandler } from "../Game/GameHandler"
import { Kingdom } from "../Game/Kingdom"
import { Settlement } from "../Game/Settlement"

function createDir(path) {
    try {
        fs.mkdirSync(path)
    } catch (error) {
        console.log(error);
        
    }
}

function checkForDataFolder() {
    createDir("data")
}

function checkForSaveFolder(id: String) {
    createDir("data/" + id)
}

function checkForKingdomsFolder(id: String) {
    createDir("data/" + id + "/kingdoms")
}

function writeManifest(gameHandler: GameHandler) {
    const data = {
        id: gameHandler.kingdom.id,
        name: gameHandler.kingdom.name,
        createdOn: gameHandler.kingdom.createdOn
    }
    const path = "data/" + gameHandler.kingdom.id + "/manifest.json"

    writeFile(path, data)
}

function writeKingdomData(kingdom: Kingdom) {
    const data = {
        id: kingdom.id
    }
    const file = "data/" + kingdom.id + "/kingdom.json"
    
    writeFile(file, data)
}

function writeKingdomsData(gameHandler: GameHandler) {
    // iterate when multiple kingdoms
    const kingdomPath = "data/" + gameHandler.kingdom.id + "/kingdoms/" + gameHandler.kingdom.id
    createDir(kingdomPath)
    const kingdom = gameHandler.kingdom
    const data = {
        id: kingdom.id,
        createdOn: kingdom.createdOn,
        name: kingdom.name
    }
    writeFile(kingdomPath + "/kingdom.json", data)

    writeSettlementsData(kingdomPath, kingdom)
}

function writeSettlementsData(path: String, kingdom: Kingdom) {
    const settlementsPath = path + "/settlements"
    createDir(settlementsPath)
    kingdom.settlements.forEach(settlement => {
        const data = {
            id: settlement.id,
            name: settlement.name
        }

        const filePath = settlementsPath + "/" + settlement.id + ".json"
        writeFile(filePath, data)
    });
}

export async function saveGame(gameHandler: GameHandler) {
    console.log("Saving game...");
    
    checkForDataFolder()
    checkForSaveFolder(gameHandler.kingdom.id)
    writeManifest(gameHandler)
    checkForKingdomsFolder(gameHandler.kingdom.id)
    writeKingdomsData(gameHandler)
}

function writeFile(path, data) {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (error) {
        console.log(error);
        
    }
}