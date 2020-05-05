import fs = require("fs")

import { GameHandler } from "../Game/Classes/GameHandler"
import { Kingdom } from "../Game/Classes/Persistant/Kingdom"
import { Settlement } from "../Game/Classes/Persistant/Settlement"

import { prefixPath } from "../path.json"
import GameMap from "../Game/Classes/Persistant/GameMap"


function getKingdom(id: String, kingdomID: String) : Kingdom {
    const obj = JSON.parse(fs.readFileSync(prefixPath + "data/" + id + "/kingdoms/" + kingdomID + "/kingdom.json").toString())
    var kingdom = new Kingdom()
    kingdom.setData(obj)

    return kingdom
}

function getMap(id: String) : GameMap {
    const obj = JSON.parse(fs.readFileSync(prefixPath + "data/" + id + "/map/map.json").toString())
    var gameMap = new GameMap()
    gameMap.setData(obj)
    
    return gameMap
}


function getSettlements(id: String, kingdomID: String) : Array<Settlement> {
    try {
        
        const settlementIds = fs.readdirSync(prefixPath + "data/" + id + "/kingdoms/" + kingdomID + "/settlements")
        var settlements: Array<Settlement> = []

        settlementIds.forEach( settlementId => {
            const obj = JSON.parse(fs.readFileSync(prefixPath + "data/" + id + "/kingdoms/" + kingdomID + "/settlements/" + settlementId).toString())
            var settlement = new Settlement("")
            settlement.setData(obj)
            settlements.push(settlement)
        })

        return settlements
    } catch (err) {
        console.log(err);
    }



    return []
}

export function loadGame(id: String) : GameHandler {

    const kingdom = getKingdom(id, id)
    const settlements = getSettlements(id, id)

    const gameMap = getMap(id)

    kingdom.settlements = settlements


    var manifest = JSON.parse(fs.readFileSync(prefixPath + "data/" + id + "/manifest.json").toString())

    
    return new GameHandler(kingdom, manifest.year, manifest.month, gameMap)
}

