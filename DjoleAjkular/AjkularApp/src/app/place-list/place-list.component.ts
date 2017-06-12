import { Component, OnInit, EventEmitter } from '@angular/core';
import {Place} from '../place/place.model';
import {PlaceListService} from './place-list.service'
import { FormGroup } from "@angular/forms/forms";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  providers: [PlaceListService]
})
export class PlaceListComponent implements OnInit {
  
  places: Place[];

  constructor(private placeService: PlaceListService, private userStatusProviderService: UserStatusProviderService)
  {
    this.places=[];
  }

  ngOnInit()
  {
    this.placeService.getAll().subscribe(x => this.places = x.json() as Place[]);
  }

  placeWasDeleted(place: Place)
  {
    var index = this.places.indexOf(place, 0);
    if (index > -1) 
    {
      this.places.splice(index, 1);
    }
  }

  placeWasAdded(place: Place)
  {
    this.places.push(place);
  }

  shouldShowAdd(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }
}
