import { Accommodation } from "../accommodation/accommodation.model";

export class AccommodationType {

    constructor(public Id?:number, public Name?: string, public Accommodations?:Accommodation[])
    {
        this.Accommodations=[];
    }

}