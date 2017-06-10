import { Component, OnInit, Input } from '@angular/core';
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

  @Input() accommodation: Accommodation

  constructor(private roomService: RoomListService) 
  { 

  }

  ngOnInit() {
  }

  onSubmit(r: Room, form: FormGroup)
  {
    form.reset();
    r.AccommodationId=this.accommodation.Id;
    this.roomService.create(r).subscribe(x => console.log(x));
  }

}
