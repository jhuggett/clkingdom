const uuidv4 = require("uuid/v4")

import { Settlement } from "./Settlement";

export class Kingdom {
    id: String
    settlements: Array<Settlement> = []

    constructor() {
        this.id = uuidv4()
    }
}