import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms/forms";
import { SearchParams } from "../search-accommodation/searchParams.model";
import { Accommodation } from "../accommodation/accommodation.model";
import { AccommodationListODataService } from "../accommodation-list/accommodation-list-OData-service";

@Component({
  selector: 'search-accommodation',
  templateUrl: './search-accommodation.component.html',
  styleUrls: ['./search-accommodation.component.css'],
  providers: [AccommodationListODataService]
})
export class SearchAccommodationComponent implements OnInit {

  accommodations: Accommodation [];
  count: number = 0;
  skip: number = 0;
  searchParamsSave;
  readonly entitiesPerPage = 1; 

  constructor(private accommodationODataService: AccommodationListODataService) { }

  ngOnInit() {
  }

 onSubmit(searchParams:SearchParams, form: FormGroup)
  {
    this.skip = 0;
    searchParams.skip = this.skip;
    this.searchParamsSave = new SearchParams(searchParams.Name,searchParams.Country,searchParams.Region,searchParams.Place,searchParams.AccommodationType,searchParams.BedCount,searchParams.Grade,searchParams.PriceMin,searchParams.PriceMax,searchParams.skip);
    this.accommodationODataService.search(searchParams).subscribe(x => this.oDataResponseParser(x));
  }

  oDataResponseParser(x: any)
  {
    this.count = x["odata.count"];
    this.accommodations = x.value as Accommodation[]
  }

  next()
  {
    this.skip += this.entitiesPerPage;
    this.searchParamsSave.skip = this.skip;
    this.accommodationODataService.search(this.searchParamsSave).subscribe(x => this.oDataResponseParser(x));
  }

  previous()
  {
    this.skip -= this.entitiesPerPage;
    this.searchParamsSave.skip = this.skip;
    this.accommodationODataService.search(this.searchParamsSave).subscribe(x => this.oDataResponseParser(x));
  }

  shouldShowNext():boolean
  {
    return (this.skip + this.entitiesPerPage) < this.count;
  }

  shouldShowPrevious():boolean
  {
    return (this.skip - this.entitiesPerPage ) >= 0;
  }

}