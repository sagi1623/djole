import { AccommodationType } from "app/accommodationtype/accommodationtype.model";
import { Room } from "app/room/room.model";
import { Place } from "app/place/place.model";

export class Accommodation {

    constructor(public Id:number, public Name:string, public Description:string, public Address:string, public AvrageGrade:number, public Latitude:number, public Longitude:number, public ImageUrl:string, public Approved:boolean, public AccommodationType:AccommodationType, public Rooms:Room[], public Place:Place, public Comments:Comment[], public PlaceId?:number)
    {
    }

}