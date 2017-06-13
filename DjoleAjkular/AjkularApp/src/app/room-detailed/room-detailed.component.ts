import { Component, OnInit, Input } from '@angular/core';
import { Room } from "../room/room.model";
import { RoomListService } from "../room-list/room-list.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { RoomReservation } from "../roomreservation/roomreservation.model";
import { RoomReservationListService } from "../roomreservation-list/roomreservation-list.service";

@Component({
  selector: 'room-detailed',
  templateUrl: './room-detailed.component.html',
  styleUrls: ['./room-detailed.component.css'],
  providers: [RoomListService, RoomReservationListService]
})
export class RoomDetailedComponent implements OnInit {

  Id: number = -1;
  room: Room;

  constructor(private roomService: RoomListService,private router: Router, private activatedRoute: ActivatedRoute, private userStatusProviderService: UserStatusProviderService)
  {
    this.room = new Room();
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
  }

  ngOnInit()
  {
    this.roomService.getById(this.Id).subscribe(x =>  this.room = x[0] as Room);
  }

  shouldShowAdd(): boolean
  {
    return this.userStatusProviderService.isUserUser();
  }

  shouldShowEdit(): boolean
  {
    return this.userStatusProviderService.isUserManager();
  }

  roomreservationWasDeleted(roomreservation:RoomReservation)
  {
    var index = this.room.RoomReservations.indexOf(roomreservation, 0);
    if (index > -1) 
    {
      this.room.RoomReservations.splice(index, 1);
    }
  }
}
