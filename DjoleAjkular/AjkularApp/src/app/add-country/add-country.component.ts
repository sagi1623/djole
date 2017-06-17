import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Country } from "../country/country.model";
import { FormGroup } from "@angular/forms/forms";
import { CountryListService } from "../country-list/country-list.service";

@Component({
  selector: 'add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css'],
  providers: [CountryListService]
})
export class AddCountryComponent implements OnInit {

  private country: Country;

  @Output() onCountryAdded: EventEmitter<Country>

  constructor(private countryService: CountryListService)
  {
    this.onCountryAdded = new EventEmitter();
  }

  ngOnInit() { }

  onSubmit(c: Country, form: FormGroup)
  {
    form.reset();
    this.countryService.create(c).subscribe(x => { this.onCountryAdded.emit(x as Country)}, x => alert('Failed to add Country.'));
  }
}
