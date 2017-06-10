import { Accommodation } from "../accommodation/accommodation.model";
import { RoomReservation } from "../roomreservation/roomreservation.model";

export class Room {

    constructor(public Id?:number, public RoomNumber?: number,public BedCount?:number, public Description?:string, public PricePerNight?:number, public Accommodation?:Accommodation, public RoomReservations?:RoomReservation[], public AccommodationId?:number)
    {
        this.RoomReservations=[];
    }

}