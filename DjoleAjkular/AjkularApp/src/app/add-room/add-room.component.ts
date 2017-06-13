import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomListService } from "../room-list/room-list.service";
import { Room } from "../room/room.model";
import { FormGroup } from "@angular/forms/forms";
import { Accommodation } from "../accommodation/accommodation.model";

@Component({
  selector: 'add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
  providers: [RoomListService]
})
export class AddRoomComponent implements OnInit {

  @Input() accommodation: Accommodation;
  @Output() onRoomAdded: EventEmitter<Room>

  constructor(private roomService: RoomListService) 
  { 
    this.onRoomAdded=new EventEmitter();
  }

  ngOnInit() { }

  onSubmit(r: Room, form: FormGroup)
  {
    form.reset();
    r.AccommodationId=this.accommodation.Id;
    this.roomService.create(r).subscribe(x => this.accommodation.Rooms.push(x as Room));
  }
}
