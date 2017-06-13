import { Component, OnInit, EventEmitter } from '@angular/core';
import {Region} from '../region/region.model';
import {RegionListService} from './region-list.service'
import { FormGroup } from "@angular/forms/forms";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css'],
  providers: [RegionListService]
})
export class RegionListComponent implements OnInit {

  regions: Region[];

  constructor(private regionService: RegionListService, private userStatusProviderService: UserStatusProviderService)
  {
    this.regions=[];
  }

  ngOnInit()
  {
    this.regionService.getAll().subscribe(x => this.regions = x.json() as Region[]);
  }

  regionWasDeleted(region: Region)
  {
    var index = this.regions.indexOf(region, 0);
    if (index > -1) 
    {
      this.regions.splice(index, 1);
    }
  }
}
