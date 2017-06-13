import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";
import { AccommodationType } from "../accommodationtype/accommodationtype.model";
import { Place } from "../place/place.model";
import { Accommodation } from "../accommodation/accommodation.model";
import { FormGroup } from "@angular/forms/forms";
import { AccommodationTypeListService } from "../accommodationtype-list/accommodationtype-list.service";

@Component({
  selector: 'add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css'],
  providers: [AccommodationListService, AccommodationTypeListService]
})
export class AddAccommodationComponent implements OnInit {

  @Input() accommodationtypes: AccommodationType[]
  @Input() place: Place
  @Output() onAccommodationAdded: EventEmitter<Accommodation>
  
  constructor(private accommodationService: AccommodationListService, private accommodationtypeService: AccommodationTypeListService)
  {
    this.onAccommodationAdded = new EventEmitter();
  }

  ngOnInit()
  {
    this.accommodationtypeService.getAll().subscribe(x => this.accommodationtypes = x.json() as AccommodationType[]);
  }

  onSubmit(a: Accommodation, form: FormGroup)
  {
    form.reset();
    a.Approved=false;
    a.AverageGrade=0;
    a.PlaceId=this.place.Id;
    a.AppUserId=1;
    this.accommodationService.create(a).subscribe(x => this.place.Accommodations.push(x as Accommodation));
  }
}
