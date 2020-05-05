import { Kingdom } from "./Persistant/Kingdom"
import GameMap from "./Persistant/GameMap";

export class GameHandler {

    gameMap: GameMap

    kingdom: Kingdom;

    year: number;

    month: number;

    tickTimeModifier: number = 1.0;
    
    constructor(kingdom: Kingdom, year: number, month: number, gameMap: GameMap) {
        this.kingdom = kingdom
        this.year = year
        this.month = month
        this.gameMap = gameMap
    }
}