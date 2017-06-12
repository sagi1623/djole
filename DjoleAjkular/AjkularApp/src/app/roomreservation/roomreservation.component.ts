import { Component, OnInit, Input } from '@angular/core';
import { RoomReservation } from "../roomreservation/roomreservation.model";
import { FormGroup } from "@angular/forms/forms";
import { RoomReservationListService } from "../roomreservation-list/roomreservation-list.service";

@Component({
  selector: 'roomreservation',
  templateUrl: './roomreservation.component.html',
  styleUrls: ['./roomreservation.component.css'],
  providers: [RoomReservationListService]
})
export class RoomreservationComponent implements OnInit {

   @Input() roomreservation: RoomReservation

  roomreservations: RoomReservation[];

  constructor(private roomreservationService: RoomReservationListService)
  {
    this.roomreservations=[];
  }

  ngOnInit()
  {
    this.roomreservationService.getAll().subscribe(x => this.roomreservations = x.json() as RoomReservation[]);
  }
}
