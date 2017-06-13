import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() onRoomReservationAdded: EventEmitter<RoomReservation>;

  constructor(private roomreservationService: RoomReservationListService) 
  { 
    this.onRoomReservationAdded = new EventEmitter();
  }

  ngOnInit() { }

  onSubmit(r: RoomReservation, form: FormGroup)
  {
    form.reset();
    r.RoomId=this.room.Id;
    r.AppUserId=1;
    this.roomreservationService.create(r).subscribe(x => this.room.RoomReservations.push(x as RoomReservation));
  }
}
