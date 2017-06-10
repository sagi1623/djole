import { Component, OnInit, Input } from '@angular/core';
import { Place } from "../place/place.model";
import { PlaceListService } from "../place-list/place-list.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'place-detailed',
  templateUrl: './place-detailed.component.html',
  styleUrls: ['./place-detailed.component.css'],
  providers: [PlaceListService]
})
export class PlaceDetailedComponent implements OnInit {

  Id: number = -1;
  place: Place;

  constructor(private placeService: PlaceListService,private router: Router, private activatedRoute: ActivatedRoute)
  {
    this.place = new Place();
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
  }

  ngOnInit()
  {
    this.placeService.getById(this.Id).subscribe(x =>  this.place = x[0] as Place);
  }

}
