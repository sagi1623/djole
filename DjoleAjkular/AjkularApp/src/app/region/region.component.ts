import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Region } from "../region/region.model";
import { RegionListService } from "../region-list/region-list.service";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  
  @Input() region: Region
  @Output() onRegionDeleted: EventEmitter<Region>;

  constructor(private regionService: RegionListService, private userStatusProviderService: UserStatusProviderService)
   {
      this.onRegionDeleted = new EventEmitter();
   }

  ngOnInit() { }

  removeRegion()
  {
    this.regionService.delete(this.region.Id).subscribe(x => { console.log(x); this.onRegionDeleted.emit(this.region)});
  }

  shouldShowRemove(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }
}
