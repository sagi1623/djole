import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms/forms";
import { SearchParams } from "../search-accommodation/searchParams.model";
import { Accommodation } from "../accommodation/accommodation.model";
import { AccommodationListODataService } from "../accommodation-list/accommodation-list-OData-service";
import { PagerService } from "../pager.service";

@Component({
  selector: 'search-accommodation',
  templateUrl: './search-accommodation.component.html',
  styleUrls: ['./search-accommodation.component.css'],
  providers: [AccommodationListODataService]
})
export class SearchAccommodationComponent implements OnInit {

  accommodations: Accommodation [];
  count: number = 0;
  searchParamsSave;
  entitiesPerPage = 1; 

  pager: any = {};

  constructor(private accommodationODataService: AccommodationListODataService, private pagerService: PagerService) { }

  ngOnInit() {
  }

 onSubmit(searchParams:SearchParams, form: FormGroup)
  {
    searchParams.pageSize = this.entitiesPerPage;
    searchParams.skip = 0;
    this.searchParamsSave = new SearchParams(searchParams.Name,searchParams.Country,searchParams.Region,searchParams.Place,searchParams.AccommodationType,searchParams.BedCount,searchParams.Grade,searchParams.PriceMin,searchParams.PriceMax,searchParams.skip);
    this.accommodationODataService.search(searchParams).subscribe(x => { this.oDataResponseParser(x); this.pager = this.pagerService.getPager(this.count, 1, this.entitiesPerPage);});
  }

  oDataResponseParser(x: any)
  {
    this.count = x["odata.count"];
    this.accommodations = x.value as Accommodation[];
  }


  setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
         this.pager = this.pagerService.getPager(this.count, page, this.entitiesPerPage);
         this.searchParamsSave.pageSize = this.entitiesPerPage;
         this.searchParamsSave.skip = this.pager.startIndex;
         this.accommodationODataService.search(this.searchParamsSave).subscribe(x => this.oDataResponseParser(x));       
    }

}
