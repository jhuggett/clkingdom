import Colorer from "./colorer"
import Decorator from "./decorator";
import Mover from "./mover";
import { spinnerFrames } from "./frames";


export class Terminal {

    static sleep = (ms) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }



    static pressAnyKeyToContinue = async (message?: string) => {
        process.stdin.setRawMode(true)
        Terminal.writeOnNewLine(message || "Press any key to continue")
        process.stdin.resume()
        
        return new Promise( (resolve) => {
            return process.stdin.once('data', (data) => {
                process.stdin.setRawMode(false)
                process.stdin.pause()
                resolve()
            })
        })
    }

    static confirm = async (message?: string) => {
        Terminal.hideCaret()
        Terminal.saveCusorSpot()

        var isTrue = false

        function draw() {
            Terminal.restoreCurorSpot()
            Terminal.write(" ")
            Terminal.write("(")
            if (isTrue) {
                Terminal.write(
                    Terminal.color.green(
                        Terminal.decoration.underline(
                            Terminal.decoration.bold(
                                "Y"
                            )
                        )
                    )
                )
                Terminal.write("/n)")
            } else {
                Terminal.write(
                    "y/"
                )
                Terminal.write(
                    Terminal.color.green(
                        Terminal.decoration.underline(
                            Terminal.decoration.bold(
                                "N"
                            )
                        )
                    )
                )
                Terminal.write(")")
            }
            Terminal.write(" ")
            Terminal.write(message || "Confirm?")
        }

        var enterNotPressed = true

        while (enterNotPressed) {
            draw()

            const code: Buffer = await Terminal.reactToKeyPress(null)

            switch(code[0]) {
                case 3: {
                    process.exit()
                }
                case 27: {
                    switch(code[2]) {
                        case 67: {
                            isTrue = false
                            break
                        }
                        case 68: {
                            isTrue = true
                            break
                        }
                        case undefined: {
                            return false
                        }
                    }
                    break
                }
                case 13: {
                    return isTrue
                }
                case 121 || 89: {
                    return true
                }
                case 110 || 78: {
                    return false
                }
            }
        }
    }

    static listOfChoices = async (title: string, options: Array<String>, goBack: string = null) => {
        Terminal.hideCaret()
        Terminal.saveCusorSpot()
        var choiceIndex = 0

        var finalList = options
        if (goBack) { finalList.push(goBack) }

        function draw() {
            Terminal.restoreCurorSpot()
            Terminal.writeOnNewLine(title)
            finalList.forEach( (option: string, i) => {
                if (i !== choiceIndex ) {
                    Terminal.writeOnNewLine(
                        "   " + option
                    )
                } else {
                    Terminal.writeOnNewLine(
                        Terminal.decoration.bold(
                            Terminal.color.green(
                                (goBack ? finalList.length - 1 === i ? "<- " : "-> " : "-> ") + Terminal.decoration.underline(option)
                            )
                        )
                    )
                }
                
            })
        }

        var enterNotPressed = true

        while (enterNotPressed) {
            draw()

            const code: Buffer = await Terminal.reactToKeyPress(null)
            switch(code[0]) {
                case 3: {
                    process.exit()
                }
                case 27: {
                    switch (code[2]) {
                        case 65: { // up
                            choiceIndex = choiceIndex - 1 < 0 ? finalList.length - 1 : choiceIndex - 1
                            break
                        }
                        case 66: { // down
                            choiceIndex = choiceIndex + 1 > finalList.length - 1 ? 0 : choiceIndex + 1
                            break
                        }

                        case 67: { // right
                            return finalList[choiceIndex] || goBack
                        }

                        case 68: { // left
                            return goBack
                        }

                        default: { // esc
                            return goBack
                        }
                    }
                    break
                }
                case 13: { //enter 
                    return finalList[choiceIndex] || goBack
                }
            }
        }

    }

    static inputLine = async (message: string = null) => {
        Terminal.hideCaret()
        Terminal.saveCusorSpot()
        
        const middlePiece = ": >>> "

        const leftSpace = message.length + middlePiece.length

        var input = ""
        var xSpot = leftSpace

        function draw() {
            Terminal.hideCaret()
            Terminal.restoreCurorSpot()
            Terminal.clearLine()
            Terminal.write(
                Terminal.decoration.bold(
                    message
                )
            )
            Terminal.write(": >>> ")
            Terminal.write(
                Terminal.color.green(
                    Terminal.decoration.bold(
                        input
                    )
                )
            )

            Terminal.return()
            Terminal.move.right(xSpot)
            Terminal.showCaret()
        }
        var enterNotPressed = true
        while (enterNotPressed) {
            draw()
            const code: Buffer = await Terminal.reactToKeyPress(null)
            switch(code[0]) {
                case 3: {
                    process.exit()
                }
                case 27: {
                    switch (code[2]) {
                        case 65: { // up
                            
                            break
                        }
                        case 66: { // down
                            
                            break
                        }

                        case 67: { // right
                            if (xSpot < input.length + leftSpace) {
                                xSpot++
                            }
                            break
                        }

                        case 68: { // left
                            if (xSpot > leftSpace) {
                                xSpot--
                            }
                            break
                        }

                        default: { // esc
                            return null
                        }
                    }
                    break
                }
                case 13: { //enter 
                    return input || null
                }
                case 127: { //backspace
                    if (input.length - 1 > -1 && xSpot > leftSpace) {
                        input = input.slice(0, xSpot - 1 - leftSpace) + input.slice(xSpot - leftSpace)
                        xSpot--
                    }
                    break
                }
                case 32: { //space 
                    input = input = input.slice(0, xSpot - leftSpace) + " " + input.slice(xSpot - leftSpace)
                    xSpot++
                    break
                }
                default: {
                    if (code[0] > 32 && code[0] < 127) {
                        input = input = input.slice(0, xSpot - leftSpace) + String.fromCharCode(code[0]) + input.slice(xSpot - leftSpace)
                        xSpot++
                    }
                    break
                }
            }
        }
    }

    static reactToKeyPress = async (callback: (code: Buffer) => boolean) : Promise<Buffer> => {
        process.stdin.setRawMode(true)
        process.stdin.resume()
        return new Promise( (resolve) => {
            return process.stdin.once('data', (data) => {
                process.stdin.setRawMode(false)
                process.stdin.pause()
                if (callback && callback(data)) {
                    Terminal.reactToKeyPress(callback)
                }

                resolve(data)
            })
        })
    }

    static color = Colorer

    static decoration = Decorator

    static move = Mover

    static spinnerFrames = spinnerFrames

    static newLine = () => {
        Terminal.write("\n")
        Terminal.return()
    }

    static return = () => {
        Terminal.write("\r")
    }

    static writeOnNewLine = (content) => {
        Terminal.newLine()
        Terminal.write(content)
    }

    static writeWithNewLine = (content) => {
        Terminal.write(content)
        Terminal.newLine()
    }

    static write = (content) => {
        process.stdout.write(content)
    }

    static clear = () => {
        process.stdout.write("\033[2J")
        Terminal.write("\033[H")
    }

    static clearLine = () => {
        Terminal.write("\u001b[2K")
    }

    static hideCaret = () => {
        process.stderr.write("\u001B[?25l")
    }

    static saveCusorSpot = () => {
        process.stderr.write("\u001B[s")
    }

    static restoreCurorSpot = () => {
        process.stderr.write("\u001B[u")
    }

    static showCaret = () => {
        process.stderr.write("\u001B[?25h")
    }

    static getWidth = () => {
        return process.stdout.columns || 0
    }

    static getHeight = () => {
        return process.stdout.rows || 0
    }

    static spinner = async (shouldStop: () => boolean) => {
        Terminal.newLine()
        
        Terminal.hideCaret()

        var frame = 0
        while (true) {
            await Terminal.sleep(100)

            const frames = Terminal.spinnerFrames[frame]
            
            frames.forEach( individualFrame => {
                Terminal.move.down(1)

                Terminal.return()
                Terminal.write(individualFrame)
                
            })
            Terminal.move.up(frames.length)
            if (frame < Terminal.spinnerFrames.length - 1) {
                frame++
            } else {
                frame = 0
            }
        }
    }
}

export default Terminal