import { Widget,
    DrawContext
} from "../Widget";

export class PickList implements Widget {


    events: [
        {
            key: "a",
            event: () => {

            }
        }
    ]


    draw(): DrawContext {
        throw new Error("Method not implemented.");
    }


}