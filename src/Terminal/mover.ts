import Terminal from "."

export default class Mover {

    static up = (givenCount: number) => {
        var count = givenCount ? givenCount : 1

        Terminal.write(`\u001b[${count.toString()}A`)
    }

    static left = (givenCount: number) => {
        var count = givenCount ? givenCount : 1

        Terminal.write(`\u001b[${count.toString()}D`)
    }

    static right = (givenCount: number) => {
        var count = givenCount ? givenCount : 1

        Terminal.write(`\u001b[${count.toString()}C`)
    }

    static down = (givenCount: number) => {
        var count = givenCount ? givenCount : 1

        Terminal.write(`\u001b[${count.toString()}B`)
    }

    static moveTo = (x: number, y: number) => {
        Terminal.write(`\u001b[${y};${x}H`)
    }
}