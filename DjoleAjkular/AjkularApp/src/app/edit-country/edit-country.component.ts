import { Component, OnInit, Input } from '@angular/core';
import { CountryListService } from "../country-list/country-list.service";
import { Country } from "../country/country.model";
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css']
})
export class EditCountryComponent implements OnInit {

  @Input() country: Country;

  constructor(private countryService: CountryListService) { }

  ngOnInit() { }

  onSubmit(form: FormGroup)
  {
    if(form.dirty)
    {
    this.countryService.update(this.country).subscribe(x => console.log(x), x => alert('Failed to edit Country.'));
    }
  }
}
