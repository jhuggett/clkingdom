import Terminal from "../Terminal"


export default async function test() {
    Terminal.clear()
    // Terminal.clear()
    // Terminal.write("Welcome to your " + Terminal.color.green("new world") + ".")
    // Terminal.writeOnNewLine(Terminal.decoration.bold("Blah") + " has been formed.")
    // Terminal.newLine()
    // Terminal.writeOnNewLine(Terminal.color.yellow("press enter to continue..."))
    // Terminal.newLine()
    var answered = false
    Terminal.spinner(() => {
        return answered
    })
    Terminal.writeOnNewLine(
        Terminal.color.blue(
            Terminal.getWidth().toString() + "x" + Terminal.getHeight().toString()
        )
    )
    Terminal.newLine()
    //await Terminal.response("press any key to continue...")
}