import { Component, OnInit, Input } from '@angular/core';
import { RoomReservation } from "../roomreservation/roomreservation.model";
import { RoomReservationListService } from "../roomreservation-list/roomreservation-list.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { LocalStorageService } from "../localStorage.service";

@Component({
  selector: 'roomreservation-detailed',
  templateUrl: './roomreservation-detailed.component.html',
  styleUrls: ['./roomreservation-detailed.component.css'],
  providers: [RoomReservationListService, LocalStorageService]
})
export class RoomreservationDetailedComponent implements OnInit {

  Id: number = -1;
  roomreservation: RoomReservation;
  show: boolean;

  constructor(private roomreservationService: RoomReservationListService,private router: Router, private activatedRoute: ActivatedRoute, private userStatusProviderService: UserStatusProviderService, private localStorageService: LocalStorageService)
  {
    this.roomreservation = new RoomReservation();
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
    this.show=false; 
  }

  ngOnInit()
  {
    this.roomreservationService.getById(this.Id).subscribe(x =>  this.roomreservation = x[0] as RoomReservation);
  }

  shouldShowEdit(): boolean
  {
    if(parseInt(this.localStorageService.get('appUserID'))==this.roomreservation.AppUserId)
    {
      this.show=true;
    }
    return (this.userStatusProviderService.isUserUser() && (this.show));
  }
}
