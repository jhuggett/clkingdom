import fs = require("fs")

import { GameHandler } from "../Game/GameHandler"
import { Kingdom } from "../Game/Kingdom"
import { Settlement } from "../Game/Settlement"

import { prefixPath } from "../../path.json"

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
        createdOn: gameHandler.kingdom.createdOn
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

function writeSettlementsData(path: String, kingdom: Kingdom) {
    const settlementsPath = path + "/settlements"
    createDir(settlementsPath)
    kingdom.settlements.forEach(settlement => {
        const data = {
            id: settlement.id,
            name: settlement.name,
            pop: settlement.pop
        }

        const filePath = settlementsPath + "/" + settlement.id + ".json"
        writeFile(filePath, data)
    });
}

export async function saveGame(gameHandler: GameHandler) {
    console.log("Saving game...");
    console.log(1);
    
    checkForDataFolder()
    console.log(2);
    
    checkForSaveFolder(gameHandler.kingdom.id)
    console.log(3);
    
    writeManifest(gameHandler)
    console.log(4);
    
    checkForKingdomsFolder(gameHandler.kingdom.id)
    console.log(5);
    
    writeKingdomsData(gameHandler)
    console.log(6);
    
}

function writeFile(path, data) {
    try {
        fs.writeFileSync(prefixPath + path, JSON.stringify(data))
    } catch (error) {
        console.log(error);
        
    }
}