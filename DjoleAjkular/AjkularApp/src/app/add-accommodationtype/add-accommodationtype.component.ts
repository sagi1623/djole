import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccommodationType } from "../accommodationtype/accommodationtype.model";
import { FormGroup } from "@angular/forms/forms";
import { AccommodationTypeListService } from "../accommodationtype-list/accommodationtype-list.service";

@Component({
  selector: 'add-accommodationtype',
  templateUrl: './add-accommodationtype.component.html',
  styleUrls: ['./add-accommodationtype.component.css'],
  providers: [AccommodationTypeListService]
})
export class AddAccommodationtypeComponent implements OnInit {

  private accommodationtype: AccommodationType;
  @Output() onAccommodationTypeAdded: EventEmitter<AccommodationType>

  constructor(private accommodationtypeService: AccommodationTypeListService)
  {
    this.onAccommodationTypeAdded = new EventEmitter();
  }

  ngOnInit() { }

   onSubmit(at: AccommodationType, form: FormGroup)
  {
    form.reset();
    this.accommodationtypeService.create(at).subscribe(x => { this.onAccommodationTypeAdded.emit(x as AccommodationType)});
  }

}
