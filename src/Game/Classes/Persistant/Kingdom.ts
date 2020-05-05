const uuidv4 = require("uuid/v4")

import { Settlement } from "./Settlement";
import Persistant from "../../Persistant";

export class Kingdom implements Persistant {
    id: string
    settlements: Array<Settlement> = []

    createdOn: number

    name: string

    constructor() {
        this.id = uuidv4()
        
        this.createdOn = Date.now()
        
    }

    setData(data) {
        this.id = data.id
        this.name = data.name
        this.createdOn = data.createdOn
    }

    getData() {
        return {
            id: this.id,
            name: this.name,
            createdOn: this.createdOn
        }
    }
}