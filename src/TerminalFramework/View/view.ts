import { Widget } from "../Widget";

export interface View {
    widgets: Array<Widget>

    

    draw(): void
}