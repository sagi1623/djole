import { Component, OnInit, Input } from '@angular/core';
import { RoomReservation } from "../roomreservation/roomreservation.model";

@Component({
  selector: 'roomreservation',
  templateUrl: './roomreservation.component.html',
  styleUrls: ['./roomreservation.component.css']
})
export class RoomreservationComponent implements OnInit {

   @Input() roomreservation: RoomReservation

  constructor() { }

  ngOnInit() {
  }

}
