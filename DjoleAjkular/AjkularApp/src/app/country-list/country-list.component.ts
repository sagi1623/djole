import { Component, OnInit, EventEmitter } from '@angular/core';
import {Country} from '../country/country.model';
import {CountryListService} from './country-list.service'
import { FormGroup } from "@angular/forms/forms";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  providers: [CountryListService]
})
export class CountryListComponent implements OnInit {

  countries: Country [];

  constructor(private countryService: CountryListService, private userStatusProviderService: UserStatusProviderService)
  { 
    this.countries=[];
  }

  ngOnInit()
  {
     this.countryService.getAll().subscribe(x => this.countries = x.json() as Country[]);
  }

  countryWasDeleted(country: Country)
  {
    var index = this.countries.indexOf(country, 0);
    if (index > -1) 
    {
      this.countries.splice(index, 1);
    }
  }

  countryWasAdded(country: Country)
  {
    this.countries.push(country);
  }

  shouldShowAdd(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }
}
