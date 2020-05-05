import Persistant from "../../Persistant";
import MapPoint from "./MapPoint";
import { GrowthMap } from "../../../Maps/GrowthMap";

export default class GameMap implements Persistant {
    points: Array<MapPoint>
    

    constructor(growthMap?: GrowthMap) {
        if (growthMap) {
            this.points = growthMap.points.map( point => new MapPoint(point) )
        } else {
            this.points = []
        }
        
    }

    getData() {
        return {
            points: this.points ? this.points.map( point => point.getData() ) : []
        }
    }

    setData(data) {        
        this.points = data.points.map( point => {
            const newPoint = new MapPoint()
            newPoint.setData(point)
            return newPoint
        })
    }
}