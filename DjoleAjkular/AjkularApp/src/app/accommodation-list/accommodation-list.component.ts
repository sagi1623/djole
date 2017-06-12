import { Component, OnInit } from '@angular/core';
import {Accommodation} from '../accommodation/accommodation.model';
import {AccommodationListService} from './accommodation-list.service'
import { FormGroup } from "@angular/forms/forms";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
  providers: [AccommodationListService]
})
export class AccommodationListComponent implements OnInit {

  accommodations: Accommodation[];

  constructor(private placeService: AccommodationListService, private userStatusProviderService: UserStatusProviderService)
  {
    this.accommodations=[];
  }

  ngOnInit()
  {
    this.placeService.getAll().subscribe(x => this.accommodations = x.json() as Accommodation[]);
    //this.accommodationtypeService.getAll().subscribe(x => this.accommodations = x.json() as Accommodation[]);
  }

  accommodationWasDeleted(accommodation: Accommodation)
  {
    var index = this.accommodations.indexOf(accommodation, 0);
    if (index > -1) 
    {
      this.accommodations.splice(index, 1);
    }
  }

  accommodationWasAdded(accommodation: Accommodation)
  {
    this.accommodations.push(accommodation);
  }
}
