export default class Colorer {
    static colors = {
        black: "\u001b[30m",
        red: "\u001b[31m",
        green: "\u001b[32m",
        yellow: "\u001b[33m",
        blue: "\u001b[34m",

        bgBlue: "\u001b[44m",
        bgGreen: "\u001b[42m",

        reset: "\u001b[0m"
    }


    static red = (content: string) => {
        return Colorer.colors.red + content + Colorer.colors.reset
    }
    static green = (content: string) => {
        return Colorer.colors.green + content + Colorer.colors.reset
    }
    static yellow = (content: string) => {
        return Colorer.colors.yellow + content + Colorer.colors.reset
    }
    static blue = (content: string) => {
        return Colorer.colors.blue + content + Colorer.colors.reset
    }

    static bgBlue = (content: string) => {
        return Colorer.colors.bgBlue + content + Colorer.colors.reset
    }

    static bgGreen = (content: string) => {
        return Colorer.colors.bgGreen + content + Colorer.colors.reset
    }


}