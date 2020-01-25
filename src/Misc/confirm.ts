import * as inquirer from "inquirer"

export async function confirm(message) {
    const questions = []
    questions.push({
        type: "confirm",
        name: "confirm",
        message: message,
        default: false,
    })

    const answers = await inquirer.prompt(questions)
    return answers.confirm
}