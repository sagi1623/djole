import { Room } from "../room/room.model";

export class RoomReservation {

    constructor(public Id?:number, public StartDate?:Date, public EndDate?:Date, public Room?:Room, public RoomId?:number, public AppUserId?: number, public Canceled?: boolean)
    {
    }

}