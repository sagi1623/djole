import { Component, OnInit, Input } from '@angular/core';
import { RoomListService } from "../room-list/room-list.service";
import { Room } from "../room/room.model";
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  @Input() room: Room;

  constructor(private roomService: RoomListService) { }

  ngOnInit() { }

  onSubmit(form: FormGroup)
  {
    if(form.dirty)
    {
      this.roomService.update(this.room).subscribe(x => console.log(x), x => alert('Failed to edit Room.'));
    }
  }
}
