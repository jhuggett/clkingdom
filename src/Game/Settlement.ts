const uuidv4 = require("uuid/v4")
import { Resources } from "./Resources"
import { throws } from "assert"

export class Settlement {
    id: string
    name: string

    pop: Array<number>
    resources: Resources

    constructor(name: string) {
        this.id = uuidv4()

        this.name = name
        this.initializePopulation()
        this.resources = new Resources()
    }

    applyToPopulation(byNumber: number, atAge: number) {
        this.pop[atAge] += byNumber
    }
    
    incrementPopulation() {
        this.pop.unshift(0)
        this.pop.pop()
    }

    initializePopulation() {
        function recursivePush(max: number, value: number, array: Array<number>) {
            var i = 0
            while (i < max) {
                array.push(value)
                i++
            }
            return array
        }
        this.pop = recursivePush(100, 0, [])
    }

    getPopulationCount(minAge: number = 0, maxAge: number = 99) {
        return this.pop.reduce( (total, amount, i) => {
            if (minAge <= i && i <= maxAge) {
                return total + amount
            }
            return total
        })
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