import Terminal from "../Terminal"
import { GrowthMap, range, LandType } from "../Maps/GrowthMap";


export default async function test() {
    Terminal.clear()

    console.log("Creating map...");

    const growthMap = new GrowthMap()
    
    growthMap.growToSize(5000)

    await mainLoop(new MapViewContext(growthMap))
}

class MapViewContext {
    growthMap: GrowthMap

    rendering: Array<Array<string>>
    
    zoomLevel: number = 1

    xOffset: number = 0
    yOffset: number = 0

    constructor(growthMap: GrowthMap) {
        this.growthMap = growthMap
    }
}

async function mainLoop(context: MapViewContext) {

    var requireRedraw = true
    var resume = true

    var moveSpeed = 8

    Terminal.reactToKeyPress( (code) : boolean => {        
        switch (code[0]) {
            case 3: {
                process.exit()
            }
            case 27: {
                switch (code[2]) {
                    case 65: { // up
                        context.yOffset -= moveSpeed
                        requireRedraw = true
                        return true
                    }
                    case 66: { // down
                        context.yOffset += moveSpeed
                        requireRedraw = true
                        return true
                    }

                    case 67: { // right
                        context.xOffset += moveSpeed * 2
                        requireRedraw = true
                        return true
                    }

                    case 68: { // left
                        context.xOffset -= moveSpeed * 2
                        requireRedraw = true
                        return true
                    }

                    default: { // esc
                        resume = false
                        return false
                    }
                }
            }
            case 13: { //enter 
                resume = false
                return false
            }
        
        default: {
            return true
        }
        }
    })
    
    
    Terminal.clear()
    Terminal.hideCaret()
    while (resume) {
        
        if (requireRedraw) {
            const newRendering = getRendering(context)

            render(newRendering, context.rendering)

            context.rendering = newRendering

            requireRedraw = false
        }
        


        await Terminal.sleep(50)
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
        previousContent.forEach( (row, y) => {
            row.forEach( (char, x) => {
                if (!newContent[y]) {
                    Terminal.move.moveTo(0, y + 1)
                    Terminal.clearLine()
                } else if (!newContent[y][x]) {
                    Terminal.move.moveTo(x + 1, y + 1)
                    Terminal.write(" ")
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

function getRendering(context: MapViewContext) : Array<Array<string>> {
    const width = Terminal.getWidth()
    const height = Terminal.getHeight()

    const xMin = context.xOffset
    const xMax = xMin + width
    const yMin = context.yOffset
    const yMax = yMin + height



    var content: Array<Array<string>> = []

    range(0, height).forEach( y => {
        content.push(
            range(0, width).map( x => {
                return Terminal.color.blue(Terminal.color.bgBlue(" "))
            })
        )
    })

    context.growthMap.points.forEach( point => {
        if (point.coor.x > xMin && point.coor.x < xMax
            && point.coor.y > yMin && point.coor.y < yMax) {

                if (point.landType == LandType.land) {
                    content[point.coor.y - context.yOffset][point.coor.x - context.xOffset] = Terminal.color.green(
                        Terminal.decoration.bold(
                            Terminal.color.bgGreen(" ")
                        )
                    )
                } else {
                    content[point.coor.y - context.yOffset][point.coor.x - context.xOffset] = Terminal.color.blue(
                        
                            Terminal.color.bgBlue(" ")
                        
                    )
                }
                
                
                
                
            }
    })



    return content
}