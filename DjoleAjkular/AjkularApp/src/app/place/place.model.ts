import { Region } from "../region/region.model";
import { Accommodation } from "../accommodation/accommodation.model";

export class Place {

    constructor(public Id?: number, public Name?:string, public Region?: Region, public Accommodations?: Accommodation[], public RegionId?: number)
    {
        this.Accommodations=[];
    }

}