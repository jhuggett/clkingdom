const uuidv4 = require("uuid/v4")

import { Settlement } from "./Settlement";

export class Kingdom {
    id: String
    settlements: Array<Settlement> = []

    createdOn: String

    name: String

    constructor() {
        this.id = uuidv4()
        const date = new Date()
        const offset: Number = date.getTimezoneOffset()
        const time = Date.now() - Number(offset)
        this.createdOn = new Date(time).toString()

        
    }
}