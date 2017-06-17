import { Component, OnInit, Input } from '@angular/core';
import { AccommodationType } from "../accommodationtype/accommodationtype.model";
import { AccommodationTypeListService } from "../accommodationtype-list/accommodationtype-list.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { Accommodation } from "../accommodation/accommodation.model";
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";

@Component({
  selector: 'accommodationtype-detailed',
  templateUrl: './accommodationtype-detailed.component.html',
  styleUrls: ['./accommodationtype-detailed.component.css'],
  providers: [AccommodationTypeListService, AccommodationListService]
})
export class AccommodationtypeDetailedComponent implements OnInit {

  Id: number = -1;
  accommodationtype: AccommodationType;

  constructor(private accommodationtypeService: AccommodationTypeListService,private router: Router, private activatedRoute: ActivatedRoute, private userStatusProviderService: UserStatusProviderService)
  {
    this.accommodationtype = new AccommodationType();
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
  }

  ngOnInit()
  {
    this.accommodationtypeService.getById(this.Id).subscribe(x =>  this.accommodationtype = x[0] as AccommodationType);
  }

  shouldShowAdd(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }

  shouldShowEdit(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }

  accommodationWasDeleted(accommodation:Accommodation)
  {
    var index = this.accommodationtype.Accommodations.indexOf(accommodation, 0);
    if (index > -1) 
    {
      this.accommodationtype.Accommodations.splice(index, 1);
    }
  }

  show(a: Accommodation): boolean
  {
    if(this.userStatusProviderService.isUserAdmin())
    {
      return true;
    }
    else
    {
      if(a.Approved)
      {
        return true;
      }
    }
    return false;
  }
}
