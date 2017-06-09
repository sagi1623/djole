import { Accommodation } from "app/accommodation/accommodation.model";
import { RoomReservation } from "app/roomreservation/roomreservation.model";

export class Room {

    constructor(public Id:number, public RoomNumber: number,public BedCount:number, public Description:string, public PricePerNight:number, public Accommodation:Accommodation, public RoomReservations:RoomReservation[])
    {
    }

}