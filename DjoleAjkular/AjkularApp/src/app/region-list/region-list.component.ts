import { Component, OnInit } from '@angular/core';
import {Region} from '../region/region.model';
import {RegionListService} from './region-list.service'
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css'],
  providers: [RegionListService]
})
export class RegionListComponent implements OnInit {

  regions: Region[];

  constructor(private regionService: RegionListService)
  {
    this.regions=[];
  }

  ngOnInit()
  {
    this.regionService.getAll().subscribe(x => this.regions = x.json() as Region[]);
  }

}
