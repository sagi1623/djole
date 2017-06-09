import { Region } from "../region/region.model";

export class Country {

    constructor(public Id?: number, public Name?:string, public Code?:string, public Regions?: Region[])
    {
        this.Regions = [];
    }

}