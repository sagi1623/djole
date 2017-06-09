import { Component, OnInit } from '@angular/core';
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

  constructor(private countryService: CountryListService) { }

  ngOnInit() {
  }

  onSubmit(c: Country, form: FormGroup)
  {
    form.reset();
    this.countryService.create(c).subscribe(x => console.log(x));
  }

}
