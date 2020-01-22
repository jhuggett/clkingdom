import * as inquirer from "inquirer"
var clear = require('clear');

export async function startGame() {
    clear()
    console.log("Game has started!");
    
    const questions = [
        {
            name: "kingdomName"
        }
    ]
}