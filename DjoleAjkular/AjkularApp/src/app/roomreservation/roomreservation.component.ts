import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomReservation } from "../roomreservation/roomreservation.model";
import { FormGroup } from "@angular/forms/forms";
import { RoomReservationListService } from "../roomreservation-list/roomreservation-list.service";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'roomreservation',
  templateUrl: './roomreservation.component.html',
  styleUrls: ['./roomreservation.component.css'],
  providers: [RoomReservationListService]
})
export class RoomreservationComponent implements OnInit {

   @Input() roomreservation: RoomReservation
   @Output() onRoomReservationDeleted: EventEmitter<RoomReservation>;

  constructor(private roomreservationService: RoomReservationListService, private userStatusProviderService: UserStatusProviderService)
  {
    this.onRoomReservationDeleted=new EventEmitter();
  }

  ngOnInit() { }

  removeRoomReservation()
  {
    this.roomreservationService.delete(this.roomreservation.Id).subscribe(x => { console.log(x); this.onRoomReservationDeleted.emit(this.roomreservation)});
  }

  shouldShowRemove(): boolean
  {
    return this.userStatusProviderService.isUserUser();
  }
}
