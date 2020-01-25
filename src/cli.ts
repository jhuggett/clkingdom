import * as arg from "arg"
import { beginCLI } from "./Main Menu/mainMenu"

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            "--new": Boolean,
            "-n": "--new"
        },
        {
            argv: rawArgs.slice(2)
        }
    )
    return {
        newGame: args["--new"] || false
    }
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args)

    beginCLI(options)
}