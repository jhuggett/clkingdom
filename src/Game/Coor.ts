export default class Coor {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    sameAs(coor: Coor) : boolean {
        if (this.x == coor.x && this.y == coor.y) {
            return true
        }
        return false
    }
}