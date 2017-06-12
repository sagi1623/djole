import { Component, OnInit, Input } from '@angular/core';
import { Place } from "../place/place.model";
import { PlaceListService } from "../place-list/place-list.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { Accommodation } from "../accommodation/accommodation.model";
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";

@Component({
  selector: 'place-detailed',
  templateUrl: './place-detailed.component.html',
  styleUrls: ['./place-detailed.component.css'],
  providers: [PlaceListService, AccommodationListService]
})
export class PlaceDetailedComponent implements OnInit {

  Id: number = -1;
  place: Place;

  constructor(private placeService: PlaceListService,private router: Router, private activatedRoute: ActivatedRoute, private userStatusProviderService: UserStatusProviderService)
  {
    this.place = new Place();
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
  }

  ngOnInit()
  {
    this.placeService.getById(this.Id).subscribe(x =>  this.place = x[0] as Place);
  }

  shouldShowAdd(): boolean
  {
    return this.userStatusProviderService.isUserManager();
  }

  shouldShowEdit(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }

   accommodationWasDeleted(accommodation:Accommodation)
  {
    var index = this.place.Accommodations.indexOf(accommodation, 0);
    if (index > -1) 
    {
      this.place.Accommodations.splice(index, 1);
    }
  }
}
