import { Component, OnInit, Input } from '@angular/core';
import { Room } from "../room/room.model";
import { RoomListService } from "../room-list/room-list.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { RoomReservation } from "../roomreservation/roomreservation.model";
import { RoomReservationListService } from "../roomreservation-list/roomreservation-list.service";
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";
import { LocalStorageService } from "../localStorage.service";
import { Accommodation } from "../accommodation/accommodation.model";

@Component({
  selector: 'room-detailed',
  templateUrl: './room-detailed.component.html',
  styleUrls: ['./room-detailed.component.css'],
  providers: [RoomListService, RoomReservationListService, AccommodationListService, LocalStorageService]
})
export class RoomDetailedComponent implements OnInit {

  Id: number = -1;
  room: Room;
  accommodation: Accommodation;
  show: boolean;

  constructor(private roomService: RoomListService,private router: Router, private activatedRoute: ActivatedRoute, private userStatusProviderService: UserStatusProviderService, private accommodationService: AccommodationListService, private localStorageService: LocalStorageService)
  {
    this.room = new Room();
    this.accommodation=new Accommodation();
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
    this.accommodation=new Accommodation();
    this.show=false;
  }

  ngOnInit()
  {
    //this.roomService.getById(this.Id).subscribe(x =>  this.room = x[0] as Room);
    this.roomService.getById(this.Id).subscribe(x =>  this.f(x));
  }

  f(x: any)
  {
    this.room = x[0] as Room;
    this.accommodationService.getById(this.room.AccommodationId).subscribe(x =>  this.accommodation = x[0] as Accommodation);
  }

  shouldShowAdd(): boolean
  {
    return this.userStatusProviderService.isUserUser();
  }

  shouldShowEdit(): boolean
  {
    if(parseInt(this.localStorageService.get('appUserID'))==this.accommodation.AppUserId)
    {
      this.show=true;
    }
    return (this.userStatusProviderService.isUserManager() && (this.show));
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
