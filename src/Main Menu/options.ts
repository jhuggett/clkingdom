import * as inquirer from "inquirer"
import * as chalk from "chalk"
var clear = require('clear');

import { goBack } from "../commonCMD.json"

var exampleOptions = [
    {
        name: "Test",
        value: true,
    },
    {
        name: "Another Test",
        value: true,
    }
]









export async function goToOptions() {
    clear()
    console.log(
        chalk.yellow.bold(
            "Options"
        )
    )

    var options = exampleOptions.map((r) => {return r.name + " (" + r.value + ")"})
    options.push(goBack)

    await inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "Select a setting:",
            choices: options
        }
    ])
    .then(answers => {
        if (answers.selection === goBack) {
            return
        }
        selectedOption(answers.selection)
    })


}

async function selectedOption(option) {

}