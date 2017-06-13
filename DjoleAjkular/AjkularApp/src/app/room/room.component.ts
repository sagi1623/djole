import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from "../room/room.model";
import { RoomListService } from "../room-list/room-list.service";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  
  @Input() room: Room
  @Output() onRoomDeleted: EventEmitter<Room>;

  constructor(private roomService: RoomListService, private userStatusProviderService: UserStatusProviderService)
   {
      this.onRoomDeleted = new EventEmitter();
   }

  ngOnInit() { }

  removeRoom()
  {
    this.roomService.delete(this.room.Id).subscribe(x => { console.log(x); this.onRoomDeleted.emit(this.room)});
  }

  shouldShowRemove(): boolean
  {
    return this.userStatusProviderService.isUserManager();
  }
}
