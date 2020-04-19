import fs = require("fs")

import { GameHandler } from "../Game/GameHandler"
import { Kingdom } from "../Game/Kingdom"
import { Settlement } from "../Game/Settlement"

import { prefixPath } from "../path.json"


function getKingdom(id: String, kingdomID: String) : Kingdom {
    const obj = JSON.parse(fs.readFileSync(prefixPath + "data/" + id + "/kingdoms/" + kingdomID + "/kingdom.json").toString())
    var kingdom = new Kingdom()
    kingdom.setData(obj)

    return kingdom
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

    kingdom.settlements = settlements


    var manifest = JSON.parse(fs.readFileSync(prefixPath + "data/" + id + "/manifest.json").toString())


    return new GameHandler(kingdom, manifest.year, manifest.month)
}

