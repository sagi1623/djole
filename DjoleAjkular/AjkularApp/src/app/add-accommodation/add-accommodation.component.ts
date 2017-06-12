import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";
import { AccommodationType } from "../accommodationtype/accommodationtype.model";
import { Place } from "../place/place.model";
import { Accommodation } from "../accommodation/accommodation.model";
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css'],
  providers: [AccommodationListService]
})
export class AddAccommodationComponent implements OnInit {

  @Input() accommodationtype: AccommodationType
  @Input() place: Place
  @Output() onAccommodationAdded: EventEmitter<Accommodation>
  
  constructor(private accommodationService: AccommodationListService)
  {
    this.onAccommodationAdded = new EventEmitter();
  }

  ngOnInit() { }

  onSubmit(a: Accommodation, form: FormGroup)
  {
    form.reset();
    a.Approved=false;
    a.PlaceId=this.place.Id;
    //a.AccommodationTypeId=this.accommodationtype.Id;
    a.AccommodationTypeId=1;
    a.AppUserId=1;
    this.accommodationService.create(a).subscribe(x => this.place.Accommodations.push(x as Accommodation));
  }
}
