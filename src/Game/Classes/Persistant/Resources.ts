import Persistant from "../../Persistant"


export class Resources implements Persistant {

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