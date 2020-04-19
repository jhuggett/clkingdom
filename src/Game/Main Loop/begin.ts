import { GameHandler } from "../GameHandler";
import * as clear from "clear"
import { question } from "../../Misc/question"
import * as chalk from "chalk"
import * as inquirer from "inquirer"
import * as readline from "readline"
import { saveGame } from "../../Save/saveGame";
import Terminal from "../../Terminal"


export async function begin(context: GameHandler) {
    
    const firstSettlement = context.kingdom.settlements[0]
    
    firstSettlement.applyToPopulation(20, 20) // initial group of settlers
    
    // console.log("Welcome to your new world.\v\v\v");
    // console.log(firstSettlement.name + " \thas been \bformed.\r54523ESC[K");
    Terminal.clear()
    
    
    Terminal.clear()
    Terminal.write("Welcome to your " + Terminal.color.green("new world") + ".")
    Terminal.writeOnNewLine(Terminal.decoration.bold(firstSettlement.name) + " has been formed.")
    Terminal.newLine()
    
    await Terminal.pressAnyKeyToContinue()

    Terminal.clear()
    

    await loop(context)
}

async function loop(context: GameHandler, resume: boolean = true) {
    var previousRendering: Array<Array<string>> = null


    var continueGame = resume

    Terminal.reactToKeyPress( (code) : boolean => {        
        switch (code[0]) {
            case 3: {
                process.exit()
            }
            case 27: {
                switch (code[2]) {
                    case 65: { // up
                        
                        return true
                    }
                    case 66: { // down
                        
                        return true
                    }

                    case 67: { // right
                        context.tickTimeModifier /= 2
                        return true
                    }

                    case 68: { // left
                        context.tickTimeModifier *= 2
                        return true
                    }

                    default: { // esc
                        continueGame = false
                        return false
                    }
                }
            }
            case 13: { //enter 
                continueGame = false
                return false
            }
        }
    })
    
    
    Terminal.clear()
    while (continueGame) {
        context = await tick(context)
        
        const newRendering = getRendering(context)

        render(newRendering, previousRendering)

        previousRendering = newRendering

        await Terminal.sleep(84 * context.tickTimeModifier) // 1/12 of a second
    }

    await saveGame(context)

    Terminal.clear()

    const option = await Terminal.listOfChoices(Terminal.color.yellow(Terminal.decoration.bold("What would you like to do")),
        ["Resume"],
        "Quit"
    )

    switch (option) {
        case "Resume": {
            await loop(context)
            break
        }
        case "Quit": {
            return
        }
    }
}

function render(newContent: Array<Array<string>>, previousContent: Array<Array<string>>) {
    if (previousContent) {
        newContent.forEach( (row, y) => {
            row.forEach( (char, x) => {
                if (char !== previousContent[y][x]) {
                    Terminal.move.moveTo(x + 1, y + 1)
                    Terminal.write(char)
                }
            })
        })
    } else {
        Terminal.move.moveTo(0, 0)
        var maxY = Terminal.getHeight()
        
        newContent.forEach( (row, y) => {
            row.forEach( (char) => {
                Terminal.write(char)
            })
            if (y !== maxY - 1) {
                Terminal.newLine()
            }
        })
    }
}

function splitLine(content: string, styling: Array<(val: string) => string> = null) : Array<string> {
    
    var splitContent = content.split("")
    

    splitContent.forEach( (char, i) => {
        if (styling) {
            styling.forEach( style => {
                splitContent[i] = style(splitContent[i])
            })
        }
    })

    return splitContent
}

function getPopInTenths(pop: Array<number>) : Array<{prefix: string, count: number}> {
    var data: Array<{prefix: string; count: number; }> = []

    var currentTenth = 0
    var currentRange: { prefix: string; count: number; }

    currentRange = {
        prefix: "0-9:",
        count: 0
    }

    pop.forEach( (count, i) => {
        if (Math.floor(i / 10) == currentTenth) {            
            currentRange.count += count
        } else {            
            data.push(currentRange)
            currentTenth++
            currentRange = {
                prefix: currentTenth + "0-" + currentTenth + "9:",
                count: count
            }
        }
    })
    data.push(currentRange)
    return data
}

function getRendering(context: GameHandler) : Array<Array<string>> {
    var content: Array<Array<string>> = []

    content.push(
        splitLine(
            "Year: " + context.year + " | Month: " + context.month,
            [Terminal.color.yellow, Terminal.decoration.bold]
        )
    )

    content.push([])

    content.push(
        splitLine("Population:", [Terminal.color.green, Terminal.decoration.bold])
    )
    
    getPopInTenths(context.kingdom.settlements[0].pop).forEach( (val) => {
        content.push(
            splitLine(" " + val.prefix + " " + val.count)
        )
    })

    return content
}

export async function continueGame(context: GameHandler) {
    await loop(context, false)
}


async function tick(context: GameHandler) {
    var newYear = false
    
    const settlement = context.kingdom.settlements[0]

    if (context.month + 1 >= 12) {
        newYear = true
        context.year++
        context.month = 0
    } else {
        context.month++
    }

    if (newYear) {
        settlement.incrementPopulation()
        
        settlement.applyToPopulation(
            Math.ceil(settlement.getPopulationCount(20, 60) * 0.04),
            0
        )

    }

    


    
    return context
}