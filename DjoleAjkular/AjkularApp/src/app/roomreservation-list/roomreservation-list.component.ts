import { Component, OnInit } from '@angular/core';
import {RoomReservation} from '../roomreservation/roomreservation.model';
import {RoomReservationListService} from './roomreservation-list.service'
import { FormGroup } from "@angular/forms/forms";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'roomreservation-list',
  templateUrl: './roomreservation-list.component.html',
  styleUrls: ['./roomreservation-list.component.css'],
  providers: [RoomReservationListService]
})
export class RoomreservationListComponent implements OnInit {

  roomreservations: RoomReservation[];

  constructor(private roomreservationService: RoomReservationListService, private userStatusProviderService: UserStatusProviderService)
  {
    this.roomreservations=[];
  }

  ngOnInit()
  {
    this.roomreservationService.getAll().subscribe(x => this.roomreservations = x.json() as RoomReservation[]);
  }

   roomreservationWasDeleted(roomreservation: RoomReservation)
  {
    var index = this.roomreservations.indexOf(roomreservation, 0);
    if (index > -1) 
    {
      this.roomreservations.splice(index, 1);
    }
  }
}
