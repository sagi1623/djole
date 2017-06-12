import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RegionListService } from "../region-list/region-list.service";
import { Region } from "../region/region.model";
import { FormGroup } from "@angular/forms/forms";
import { Country } from "../country/country.model";

@Component({
  selector: 'add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.css'],
  providers: [RegionListService]
})
export class AddRegionComponent implements OnInit {
  
  @Input() country: Country
  @Output() onRegionAdded: EventEmitter<Region>

  constructor(private regionService: RegionListService) 
  { 
     this.onRegionAdded = new EventEmitter();
  }

  ngOnInit() { }

  onSubmit(r: Region, form: FormGroup)
  {
    form.reset();
    r.CountryId=this.country.Id;
    this.regionService.create(r).subscribe(x => this.country.Regions.push(x as Region));
  }

}
