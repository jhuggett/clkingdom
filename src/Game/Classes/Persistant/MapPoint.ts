import Persistant from "../../Persistant";
import { GrowthPointData } from "../../../Maps/GrowthMap";
import Coor from "../../Coor";

export default class MapPoint implements Persistant {
    coor: Coor

    constructor(growthPoint?: GrowthPointData) {
        if (growthPoint) {
            this.coor = growthPoint.coor
        } else {
            this.coor = new Coor(0, 0)
        }
        
    }

    getData() {
        return {
            coor: this.coor
        }
    }

    setData(data) {
        this.coor = new Coor(data.coor.x, data.coor.y)
    }
}