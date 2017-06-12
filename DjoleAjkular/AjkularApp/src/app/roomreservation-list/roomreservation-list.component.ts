import { Component, OnInit } from '@angular/core';
import {RoomReservation} from '../roomreservation/roomreservation.model';
import {RoomReservationListService} from './roomreservation-list.service'
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'roomreservation-list',
  templateUrl: './roomreservation-list.component.html',
  styleUrls: ['./roomreservation-list.component.css'],
  providers: [RoomReservationListService]
})
export class RoomreservationListComponent implements OnInit {

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
