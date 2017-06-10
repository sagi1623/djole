import { Component, OnInit, Input } from '@angular/core';
import { AccommodationType } from "../accommodationtype/accommodationtype.model";
import { AccommodationTypeListService } from "../accommodationtype-list/accommodationtype-list.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'accommodationtype-detailed',
  templateUrl: './accommodationtype-detailed.component.html',
  styleUrls: ['./accommodationtype-detailed.component.css'],
  providers: [AccommodationTypeListService]
})
export class AccommodationtypeDetailedComponent implements OnInit {

  Id: number = -1;
  accommodationtype: AccommodationType;

  constructor(private accommodationtypeService: AccommodationTypeListService,private router: Router, private activatedRoute: ActivatedRoute)
  {
    this.accommodationtype = new AccommodationType();
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
  }

  ngOnInit()
  {
    this.accommodationtypeService.getById(this.Id).subscribe(x =>  this.accommodationtype = x[0] as AccommodationType);
  }

}
