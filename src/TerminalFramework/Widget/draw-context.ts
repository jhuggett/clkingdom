import { DrawPoint } from "."

export class Dimensions {
    constructor(
        public width: number,
        public height: number
    ){}
}

export class DrawContext {
    rendering: Array<Array<DrawPoint>>


    getDimensions() {
        return new Dimensions(
            this.rendering.length,
            this.rendering[0].length || 0
        )
    }
}