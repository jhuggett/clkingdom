import { Kingdom } from "./Kingdom"

export class GameHandler {
    kingdom: Kingdom;

    year: number;

    month: number;

    tickTimeModifier: number = 1.0;
    
    constructor(kingdom: Kingdom, year: number, month: number) {
        this.kingdom = kingdom
        this.year = year
        this.month = month
    }
}