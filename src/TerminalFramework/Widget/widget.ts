import { DrawContext } from "."

export interface KeyEvent {
    key: string
    event(): any | null
}

export interface Widget {
    draw(): DrawContext

    events: Array<KeyEvent>
}