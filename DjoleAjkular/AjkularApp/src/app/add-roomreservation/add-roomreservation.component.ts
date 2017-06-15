import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomReservationListService } from "../roomreservation-list/roomreservation-list.service";
import { RoomReservation } from "../roomreservation/roomreservation.model";
import { FormGroup } from "@angular/forms/forms";
import { Room } from "../room/room.model";
import { LocalStorageService } from "../localStorage.service";

@Component({
  selector: 'add-roomreservation',
  templateUrl: './add-roomreservation.component.html',
  styleUrls: ['./add-roomreservation.component.css'],
  providers: [RoomReservationListService, LocalStorageService]
})
export class AddRoomreservationComponent implements OnInit {

  @Input() room: Room;
  @Output() onRoomReservationAdded: EventEmitter<RoomReservation>;
  currentDate: string;

  constructor(private roomreservationService: RoomReservationListService, private localStorageService: LocalStorageService) 
  { 
    this.onRoomReservationAdded = new EventEmitter();

  }

  ngOnInit() 
  {
    this.currentDate = new Date().toJSON().split('T')[0];
  }

  onSubmit(r: RoomReservation, form: FormGroup)
  {
    form.reset();
    r.Canceled=false;
    r.RoomId=this.room.Id;
    r.AppUserId=parseInt(this.localStorageService.get('appUserID'));
    this.roomreservationService.create(r).subscribe(x => this.room.RoomReservations.push(x as RoomReservation));
  }
}
