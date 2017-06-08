import { Accommodation } from "app/accommodation/accommodation.model";

export class AccommodationType {

    constructor(public Name: string, public Accommodations:Accommodation[])
    {
    }

}