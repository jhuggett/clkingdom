const uuidv4 = require("uuid/v4")

export class Settlement {
    id: String
    name: String

    constructor(name: String) {
        this.id = uuidv4()

        this.name = name

    }
}