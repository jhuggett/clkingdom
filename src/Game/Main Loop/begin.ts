import { GameHandler } from "../GameHandler";
import * as clear from "clear"
import { question } from "../../Misc/question"

export async function begin(context: GameHandler) {
    clear()
    const firstSettlement = context.kingdom.settlements[0]
    
    firstSettlement.applyToPopulation(20) // initial group of settlers

    console.log("Welcome to your new world.");
    console.log(firstSettlement.name + " has been formed.");
    
    await question("")
    
}