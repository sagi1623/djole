import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms/forms";
import { SearchParams } from "../search-accommodation/searchParams.model";
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";
import { Accommodation } from "../accommodation/accommodation.model";

@Component({
  selector: 'search-accommodation',
  templateUrl: './search-accommodation.component.html',
  styleUrls: ['./search-accommodation.component.css'],
  providers: [AccommodationListService]
})
export class SearchAccommodationComponent implements OnInit {

  accommodations: Accommodation [];

  constructor(private accommodationService: AccommodationListService) { }

  ngOnInit() {
  }

 onSubmit(searchParams:SearchParams, form: FormGroup)
  {
    this.accommodationService.search(searchParams).subscribe(x => this.accommodations = x as Accommodation [] );
  }

}
