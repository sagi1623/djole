import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Country} from './country.model';
import { CountryListService } from "../country-list/country-list.service";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {

@Input() country: Country

@Output() onCountryDeleted: EventEmitter<Country>;

  constructor(private countryService: CountryListService, private userStatusProviderService: UserStatusProviderService)
   {
      this.onCountryDeleted = new EventEmitter();
   }

  ngOnInit() {
  }

  removeCountry()
  {
    this.countryService.delete(this.country.Id).subscribe(x => { console.log(x); this.onCountryDeleted.emit(this.country) } );
  }

  shouldShowRemove(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }

}
