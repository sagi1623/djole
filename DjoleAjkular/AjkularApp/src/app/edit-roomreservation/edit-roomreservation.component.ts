import { Component, OnInit, Input } from '@angular/core';
import { RoomReservationListService } from "../roomreservation-list/roomreservation-list.service";
import { RoomReservation } from "../roomreservation/roomreservation.model";
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'edit-roomreservation',
  templateUrl: './edit-roomreservation.component.html',
  styleUrls: ['./edit-roomreservation.component.css']
})
export class EditRoomreservationComponent implements OnInit {

  @Input() roomreservation: RoomReservation;
  startDate: Date;
  endDate: Date;

  constructor(private roomreservationService: RoomReservationListService) { }

  ngOnInit() { }

  onSubmit(form: FormGroup)
  {
    if(form.dirty)
    {    
      this.startDate.setDate(this.roomreservation.StartDate.getDate());
      this.endDate.setDate(this.roomreservation.EndDate.getDate());
      this.roomreservationService.update(this.roomreservation).subscribe(x => console.log(x));
    }
  }
}
