import { GameHandler } from "../GameHandler";
import * as clear from "clear"
import { question } from "../../Misc/question"
import * as chalk from "chalk"
import * as inquirer from "inquirer"
import * as readline from "readline"
import { saveGame } from "../../Save/saveGame";

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}   

export async function begin(context: GameHandler) {
    clear()
    const firstSettlement = context.kingdom.settlements[0]
    
    firstSettlement.applyToPopulation(20) // initial group of settlers

    console.log("Welcome to your new world.");
    console.log(firstSettlement.name + " has been formed.");
    
    await question("")
    await mainScreen(context, 0);
}

export async function continueGame(context: GameHandler) {
    await mainScreen(context, 0)
}

async function mainScreen(context: GameHandler, month) {
    clear()
    console.log("saving...");
    await saveGame(context)
    
    clear();

    let settlement = context.kingdom.settlements[0]

    console.log(settlement.name);
    
    console.log("Population: " + settlement.pop);
    
    console.log("Food: " + settlement.resources.food);

    const questions = []
    questions.push({
        type: "list",
        name: "choice",
        message: chalk.yellow.bold("What would you like to do?"),
        choices: ["Resume", "Assign", "Quit"],
        default: "Resume"
    })
    const answers = await inquirer.prompt(questions)
    var currMonth = month

    switch (answers.choice) {
        case "Resume": {
            currMonth = await resume(context, currMonth)
            break
        }
        case "Assign": {
            await mainScreen(context, 0)
            break
        }
        default: {
            return
        }
    }

    mainScreen(context, currMonth)
}

const months = ["January",
                "Febuary",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
                ]

async function resume(context: GameHandler, month: number) {
    clear()
    console.log('Press any key to pause...');
    var keypressed = false

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        keypressed = true;
        console.log("Pausing game!");
        
    });


    const lastMonth = months.length
    var currMonth = month
    
    while (!keypressed) {
        console.log(months[currMonth] + "...");
        

        await tick(context)

        if (currMonth == lastMonth - 1) {
            return 0
        } else {
            currMonth += 1
        }
    }
    
    
    return currMonth
}

async function tick(context: GameHandler) {
    context.kingdom.settlements[0].pop += 1
    await sleep(1000);
}