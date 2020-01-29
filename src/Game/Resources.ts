import { throws } from "assert"

export class Resources {

    food: Number

    constructor() {
        this.food = 0
    }


    setData(data) {
        this.food = data.food
    }

    getData() {
        return {
            food: this.food
        }
    }
}