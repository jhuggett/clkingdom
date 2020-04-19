export default class Decorator {
    static decorations = {
        bold: "\u001b[1m",
        underline: "\u001b[4m",
        reversed: "\u001b[7m",

        reset: "\u001b[0m"
    }

    static bold = (content: string) => {
        return Decorator.decorations.bold + content + Decorator.decorations.reset
    }
    static underline = (content: string) => {
        return Decorator.decorations.underline + content + Decorator.decorations.reset
    }
    static reversed = (content: string) => {
        return Decorator.decorations.reversed + content + Decorator.decorations.reset
    }
}