import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from "../room/room.model";
import { RoomListService } from "../room-list/room-list.service";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { Accommodation } from "../accommodation/accommodation.model";
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";
import { LocalStorageService } from "../localStorage.service";

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [AccommodationListService, LocalStorageService]
})
export class RoomComponent implements OnInit {
  
  @Input() room: Room
  @Output() onRoomDeleted: EventEmitter<Room>;
  accommodation: Accommodation;
  show: boolean;

  constructor(private roomService: RoomListService, private userStatusProviderService: UserStatusProviderService, private accommodationService: AccommodationListService, private localStorageService: LocalStorageService)
   {
      this.onRoomDeleted = new EventEmitter();
      this.accommodation=new Accommodation();
      this.show=false;
   }

  ngOnInit()
  {
    this.accommodationService.getById(this.room.AccommodationId).subscribe(x =>  this.accommodation = x[0] as Accommodation);
  }

  removeRoom()
  {
    this.roomService.delete(this.room.Id).subscribe(x => { console.log(x); this.onRoomDeleted.emit(this.room)}, x => alert('Failed to remove Room.'));
  }

  shouldShowRemove(): boolean
  {
    if(parseInt(this.localStorageService.get('appUserID'))==this.accommodation.AppUserId)
    {
      this.show=true;
    }
    return (this.userStatusProviderService.isUserManager() && (this.show));
  }
}
