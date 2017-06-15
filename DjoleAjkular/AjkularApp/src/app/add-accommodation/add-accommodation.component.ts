import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";
import { AccommodationType } from "../accommodationtype/accommodationtype.model";
import { Place } from "../place/place.model";
import { Accommodation } from "../accommodation/accommodation.model";
import { FormGroup } from "@angular/forms/forms";
import { AccommodationTypeListService } from "../accommodationtype-list/accommodationtype-list.service";
import { LocalStorageService } from "../localStorage.service";

@Component({
  selector: 'add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css'],
  providers: [AccommodationListService, AccommodationTypeListService, LocalStorageService]
})
export class AddAccommodationComponent implements OnInit {

  @Input() accommodationtypes: AccommodationType[];
  @Input() place: Place;
  @Output() onAccommodationAdded: EventEmitter<Accommodation>;
  file: File;
  
  constructor(private accommodationService: AccommodationListService, private accommodationtypeService: AccommodationTypeListService, private localStorageService: LocalStorageService)
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
    a.AppUserId=parseInt(this.localStorageService.get('appUserID'));
    //image
    this.accommodationService.create(a,this.file).subscribe(x=>this.place.Accommodations.push(x as Accommodation));
  }

  onChange(event: EventTarget)
  {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.file = files[0];
        console.log(this.file);
    }
}
