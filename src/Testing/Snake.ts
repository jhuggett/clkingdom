import Terminal from "../Terminal";

export default async function Snake() {
    
    Terminal.clear()

    Terminal.writeOnNewLine(
        Terminal.color.green(
            Terminal.decoration.bold(
                "Welcome to Snake!"
            )
        )
    )
    Terminal.newLine()
    await Terminal.pressAnyKeyToContinue(
        Terminal.color.yellow(
            "Press any key to begin"
        )
    )
    
    const result = await snake()
    if (result) {
        Terminal.clear()

        Terminal.write(
            Terminal.decoration.bold(
                Terminal.color.red(
                    "Game Over"
                )
            )
        )
        Terminal.writeOnNewLine("Final Score: " + result.score.toString())

        await Terminal.pressAnyKeyToContinue()
    }
}

enum Direction {
    north, east, south, west
}

class Coor {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

class SnakeContext {
    width() : number {
        return Terminal.getWidth()
    }

    height() : number {
        return Terminal.getHeight()
    }

    foodLocation?: Coor

    snake: Array<Coor> // 0 is head
    snakeDirection: Direction

    score: number

    constructor(snake: Array<Coor>, direction: Direction) {
        this.snake = snake
        this.snakeDirection = direction
        this.score = 0
    }
}

async function snake() {
    var context = new SnakeContext([new Coor(5, 3), new Coor(4, 3), new Coor(3, 3), new Coor(2, 3), new Coor(1, 3)], Direction.east)

    var keepRunning = true

    var direction = context.snakeDirection

    context.foodLocation = new Coor(5, 5)

    Terminal.reactToKeyPress( (code) : boolean => {        
        switch (code.toString()) {
            case "\u001b": {
                // esc
                keepRunning = false

                return false
            }
            case "\u001b[D": {
                // left
                if (direction != Direction.east) {
                    direction = Direction.west
                }
                
                

                return true
            }
            case "\u001b[A": {
                // up
                if (direction != Direction.south) {
                    direction = Direction.north
                }
                
                

                return true
            }
            case "\u001b[C": {
                // right
                if (direction != Direction.west) {
                    direction = Direction.east
                }
            
                

                return true
            }
            case "\u001b[B": {
                // down
                if (direction != Direction.north) {
                    direction = Direction.south
                }
                
                

                return true
            }
            default: {
                return true
            }
        }
    })

    var previousContent = null
    Terminal.hideCaret()
    while (keepRunning) {
        context.snakeDirection = direction
        const newContext = tick(context)
        if (!newContext) {
            return context
        }
        context = newContext
        const newContent = getRendering(context)
        render(previousContent, newContent)
        previousContent = newContent
        await Terminal.sleep(75)
    }

}

function areCoorsEqual(first: Coor, second: Coor) : boolean {
    if (first.x === second.x && first.y === second.y) {
        return true
    }
    return false
}

function getOffsetCoor(coor: Coor, direction: Direction) : Coor {
    switch (direction) {
        case Direction.north: {
            return new Coor(coor.x, coor.y - 1)
        }
        case Direction.south: {
            return new Coor(coor.x, coor.y + 1)
        }
        case Direction.east: {
            return new Coor(coor.x + 1, coor.y)
        }
        case Direction.west: {
            return new Coor(coor.x - 1, coor.y) 
        }
    }
}

function getRandomCoor(context: SnakeContext) : Coor { // warning!!! this could go on forever...
    
    const x = Math.floor(Math.random() * context.width() - 2) + 1

    const y = Math.floor(Math.random() * context.height() - 2) + 1

    const newCoor = new Coor(x, y)

    if (!(context.snake.some( e => e.x === newCoor.x && e.y === newCoor.y))) {
        return newCoor
    } else {
        return getRandomCoor(context)
    }
}

function tick(context: SnakeContext) : SnakeContext {

    
    const newHeadPoint = getOffsetCoor(context.snake[0], context.snakeDirection)
    

    if (newHeadPoint.x === 0 || newHeadPoint.x === context.width() - 1 ||
        newHeadPoint.y === 0 || newHeadPoint.y === context.height() - 1 ||
        context.snake.some( e => e.x === newHeadPoint.x && e.y === newHeadPoint.y)) {
            return null // Game over
    }

    context.snake.unshift(newHeadPoint)

    if (context.foodLocation && areCoorsEqual(context.foodLocation, newHeadPoint)) {
        context.score += 1
        context.foodLocation = getRandomCoor(context)
    } else {
        context.snake.splice(-1, 1)[0]
    }

    

    return context
}

function render(previousContent: Array<Array<string>>, newContent: Array<Array<string>>) {
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

function getRendering(context: SnakeContext) : Array<Array<string>> {
    var content: Array<Array<string>> = []


    for (var y = 0; y < context.height(); y++) {
        var newRow: Array<string> = []
        for (var x = 0; x < context.width(); x++) {
            const newCoor = new Coor(x, y)
            if (context.foodLocation && areCoorsEqual(context.foodLocation, newCoor)) {
                newRow.push(Terminal.color.green("X"))
            } else if (y === 0 || y === context.height() - 1) { 
                newRow.push(
                    Terminal.color.red(
                        "-"
                    )
                )
            } else if (x === 0 || x === context.width() - 1) { 
                newRow.push(
                    Terminal.color.red(
                        "|"
                    )
                )
            } else if (context.snake.some( e => e.x === newCoor.x && e.y === newCoor.y)) {
                if (areCoorsEqual(newCoor, context.snake[0])) {
                    newRow.push(Terminal.color.yellow("O"))
                } else {
                    newRow.push(Terminal.color.yellow("o"))
                }
                
            } else {
                newRow.push(" ")
            }
        }
        content.push(newRow)
    }



    return content
}