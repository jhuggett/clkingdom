import * as arg from "arg"
import { beginCLI } from "./Main Menu/mainMenu"
import * as fs from "fs"

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

    var cleanedPath = __dirname.split("/")
    cleanedPath.pop()
    cleanedPath.pop()
    const finalPath = cleanedPath.join("/") + "/"

    const path = {
        prefixPath: finalPath
    }
    const json = JSON.stringify(path)
    try {
        fs.writeFileSync(finalPath + "path.json", json)        
    }
    catch (e) {
        console.log(e);
    }
    

    beginCLI(options)
}