import { Component, OnInit } from '@angular/core';
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

  constructor(private accommodationtypeService: AccommodationTypeListService) { }

  ngOnInit()
  {
    
  }

   onSubmit(at: AccommodationType, form: FormGroup)
  {
    form.reset();
    this.accommodationtypeService.create(at).subscribe(x => console.log(x));
  }

}
