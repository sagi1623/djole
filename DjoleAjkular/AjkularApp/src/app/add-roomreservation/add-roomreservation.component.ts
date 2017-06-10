import { Component, OnInit, Input } from '@angular/core';
import { RoomReservationListService } from "../roomreservation-list/roomreservation-list.service";
import { RoomReservation } from "../roomreservation/roomreservation.model";
import { FormGroup } from "@angular/forms/forms";
import { Room } from "../room/room.model";

@Component({
  selector: 'add-roomreservation',
  templateUrl: './add-roomreservation.component.html',
  styleUrls: ['./add-roomreservation.component.css'],
  providers: [RoomReservationListService]
})
export class AddRoomreservationComponent implements OnInit {

  @Input() room: Room;

  constructor() { }

  ngOnInit() {
  }

}
