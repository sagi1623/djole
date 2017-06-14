import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomReservation } from "../roomreservation/roomreservation.model";
import { FormGroup } from "@angular/forms/forms";
import { RoomReservationListService } from "../roomreservation-list/roomreservation-list.service";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { LocalStorageService } from "../localStorage.service";

@Component({
  selector: 'roomreservation',
  templateUrl: './roomreservation.component.html',
  styleUrls: ['./roomreservation.component.css'],
  providers: [RoomReservationListService, LocalStorageService]
})
export class RoomreservationComponent implements OnInit {

   @Input() roomreservation: RoomReservation
   @Output() onRoomReservationDeleted: EventEmitter<RoomReservation>;
   show: boolean;

  constructor(private roomreservationService: RoomReservationListService, private userStatusProviderService: UserStatusProviderService, private localStorageService: LocalStorageService)
  {
    this.onRoomReservationDeleted=new EventEmitter();
    this.show=false;
  }

  ngOnInit() { }

  cancelRoomReservation()
  {
    //this.roomreservationService.delete(this.roomreservation.Id).subscribe(x => { console.log(x); this.onRoomReservationDeleted.emit(this.roomreservation)});
    //dodaj
    this.roomreservation.Canceled=true;
    this.roomreservationService.update(this.roomreservation).subscribe(x => console.log(x));
  }

  shouldShowCancel(): boolean
  {
    if(parseInt(this.localStorageService.get('appUserID'))==this.roomreservation.AppUserId)
    {
      this.show=true;
    }
    return (this.userStatusProviderService.isUserUser() && (this.show));
  }

  isCanceled()
  {
    return this.roomreservation.Canceled; //false za nije otkazano, true ako jeste
  }
}
