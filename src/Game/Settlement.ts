const uuidv4 = require("uuid/v4")
import { Resources } from "./Resources"
import { throws } from "assert"

export class Settlement {
    id: string
    name: string

    pop: number
    resources: Resources

    constructor(name: string) {
        this.id = uuidv4()

        this.name = name
        this.pop = 0
        this.resources = new Resources()
    }

    applyToPopulation(byNumber: number) {
        this.pop = this.pop + byNumber
    }


    setData(data) {
        this.id = data.id
        this.name = data.name
        this.pop = data.pop
        this.resources.setData(data.resources)
    }

    getData() {
        return {
            id: this.id,
            name: this.name,
            pop: this.pop,
            resources: this.resources.getData()
        }
    }
}