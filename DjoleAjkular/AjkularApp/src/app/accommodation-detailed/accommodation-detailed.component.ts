import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from "../accommodation/accommodation.model";
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'accommodation-detailed',
  templateUrl: './accommodation-detailed.component.html',
  styleUrls: ['./accommodation-detailed.component.css'],
  providers: [AccommodationListService]
})
export class AccommodationDetailedComponent implements OnInit {

  Id: number = -1;
  accommodation: Accommodation;

  constructor(private accommodationService: AccommodationListService,private router: Router, private activatedRoute: ActivatedRoute)
  {
    this.accommodation = new Accommodation();
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
  }

  ngOnInit()
  {
    this.accommodationService.getById(this.Id).subscribe(x =>  this.accommodation = x[0] as Accommodation);
  }

}
