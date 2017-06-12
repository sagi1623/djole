import { Component, OnInit, Input } from '@angular/core';
import { Country } from "../country/country.model";
import { CountryListService } from "../country-list/country-list.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { Region } from "../region/region.model";
import { RegionListService } from "../region-list/region-list.service";

@Component({
  selector: 'country-detailed',
  templateUrl: './country-detailed.component.html',
  styleUrls: ['./country-detailed.component.css'],
  providers: [CountryListService, RegionListService]
})
export class CountryDetailedComponent implements OnInit {

  Id: number = -1;
  country: Country;

  constructor(private countryService: CountryListService,private router: Router, private activatedRoute: ActivatedRoute, private userStatusProviderService: UserStatusProviderService) 
  {
    this.country = new Country();
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
  }

  ngOnInit()
  {
   this.countryService.getById(this.Id).subscribe(x =>  this.country = x[0] as Country);
  }

  shouldShowAdd(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }

  shouldShowEdit(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }

}
