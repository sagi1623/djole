import { Accommodation } from "../accommodation/accommodation.model";
import { Comment } from "../comment/comment.model";
import { RoomReservation } from "../roomreservation/roomreservation.model";

export class User
{
    constructor (public Id?: number, public FirstName?: string, public LastName?: string, public Banned?: boolean, public Accommodations?: Accommodation[], public Comments?: Comment[], public RoomReservations?: RoomReservation[])
    {
        this.Accommodations=[];
        this.Comments=[];
        this.RoomReservations=[];
        this.Banned=false;
        this.FirstName="";
        this.LastName="";
    }
}