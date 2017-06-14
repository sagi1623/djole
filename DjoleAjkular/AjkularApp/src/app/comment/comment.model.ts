import { Accommodation } from "../accommodation/accommodation.model";

export class Comment {

    constructor(public Grade?: number, public Text?:string, public Accommodation?: Accommodation, public AccommodationId?: number, public AppUserId?: number)
    {
    }

}