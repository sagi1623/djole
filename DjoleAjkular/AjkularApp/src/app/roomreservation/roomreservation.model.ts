import { Room } from "app/room/room.model";

export class RoomReservation {

    constructor(public Id:number, public StartDate:Date, public EndDate:Date, public Room:Room)
    {
    }

}