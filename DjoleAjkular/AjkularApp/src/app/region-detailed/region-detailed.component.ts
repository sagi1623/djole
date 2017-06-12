import { Component, OnInit, Input } from '@angular/core';
import { Region } from "../region/region.model";
import { RegionListService } from "../region-list/region-list.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'region-detailed',
  templateUrl: './region-detailed.component.html',
  styleUrls: ['./region-detailed.component.css'],
  providers: [RegionListService]
})
export class RegionDetailedComponent implements OnInit {

  Id: number = -1;
  region: Region;

  constructor(private regionService: RegionListService,private router: Router, private activatedRoute: ActivatedRoute, private userStatusProviderService: UserStatusProviderService)
  {
    this.region = new Region();
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
  }

  ngOnInit()
  {
    this.regionService.getById(this.Id).subscribe(x =>  this.region = x[0] as Region);
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
