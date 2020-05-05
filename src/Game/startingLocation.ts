import Terminal from "../Terminal"
import { GrowthMap, range, LandType } from "../Maps/GrowthMap";


export async function generateMap() : Promise<GrowthMap> {
    var chosenMap = null

    const growthMap = new GrowthMap()
    
    growthMap.growToSize(5000)

    return chosenMap
}
