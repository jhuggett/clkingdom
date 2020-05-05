import fs = require("fs")

import { GameHandler } from "../Game/Classes/GameHandler"
import { Kingdom } from "../Game/Classes/Persistant/Kingdom"
import { Settlement } from "../Game/Classes/Persistant/Settlement"

import { prefixPath } from "../path.json"

function createDir(path) {
    try {
        fs.mkdirSync(prefixPath + path)
    } catch (error) {
        
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
        createdOn: gameHandler.kingdom.createdOn,
        year: gameHandler.year,
        month: gameHandler.month
    }
    const path = "data/" + gameHandler.kingdom.id + "/manifest.json"

    writeFile(path, data)
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

function writeMapData(gameHandler: GameHandler) {
    const path = "data/" + gameHandler.kingdom.id + "/map"
    createDir(path)

    const data = gameHandler.gameMap.getData()

    writeFile(path + "/map.json", data)
}

function writeSettlementsData(path: String, kingdom: Kingdom) {
    const settlementsPath = path + "/settlements"
    createDir(settlementsPath)
    kingdom.settlements.forEach(settlement => {
        console.log(settlement.resources.getData());
        
        const data = settlement.getData()

        const filePath = settlementsPath + "/" + settlement.id + ".json"
        writeFile(filePath, data)
    });
}

export async function saveGame(gameHandler: GameHandler) {    
    checkForDataFolder()    
    checkForSaveFolder(gameHandler.kingdom.id)    
    writeManifest(gameHandler)    
    writeMapData(gameHandler)
    checkForKingdomsFolder(gameHandler.kingdom.id)    
    writeKingdomsData(gameHandler)    
}

function writeFile(path, data) {
    try {
        fs.writeFileSync(prefixPath + path, JSON.stringify(data))
    } catch (error) {
        console.log(error);
        
    }
}