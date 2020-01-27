const uuidv4 = require("uuid/v4")
import { Resources } from "./Resources"

export class Settlement {
    id: String
    name: String

    pop: Number
    resources: Resources

    constructor(name: String) {
        this.id = uuidv4()

        this.name = name
        this.pop = 0
        this.resources = new Resources()
    }
}