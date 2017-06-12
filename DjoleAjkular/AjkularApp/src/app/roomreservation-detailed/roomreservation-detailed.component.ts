import { Component, OnInit, Input } from '@angular/core';
import { RoomReservation } from "../roomreservation/roomreservation.model";
import { RoomReservationListService } from "../roomreservation-list/roomreservation-list.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'roomreservation-detailed',
  templateUrl: './roomreservation-detailed.component.html',
  styleUrls: ['./roomreservation-detailed.component.css'],
  providers: [RoomReservationListService]
})
export class RoomreservationDetailedComponent implements OnInit {

  Id: number = -1;
  roomreservation: RoomReservation;

  constructor(private roomreservationService: RoomReservationListService,private router: Router, private activatedRoute: ActivatedRoute)
  {
    this.roomreservation = new RoomReservation();
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
  }

  ngOnInit()
  {
    this.roomreservationService.getById(this.Id).subscribe(x =>  this.roomreservation = x[0] as RoomReservation);
  }
}
