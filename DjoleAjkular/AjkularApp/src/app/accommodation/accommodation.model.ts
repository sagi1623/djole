import { AccommodationType } from "../accommodationtype/accommodationtype.model";
import { Room } from "../room/room.model";
import { Place } from "../place/place.model";

export class Accommodation {

    constructor(public Id?:number, public Name?:string, public Description?:string, public Address?:string, public AverageGrade?:number, public Latitude?:number, public Longitude?:number, public ImageUrl?:string, public Approved?:boolean, public AccommodationType?:AccommodationType, public Rooms?:Room[], public Place?:Place, public Comments?:Comment[], public PlaceId?:number, public AccommodationTypeId?: number, public AppUserId?: number)
    {
        this.Rooms=[];
        this.Comments=[];
    }

}