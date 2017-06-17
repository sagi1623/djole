import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Place } from "../place/place.model";
import { PlaceListService } from "../place-list/place-list.service";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  @Input() place: Place
  @Output() onPlaceDeleted: EventEmitter<Place>;

  constructor(private placeService: PlaceListService, private userStatusProviderService: UserStatusProviderService)
   {
      this.onPlaceDeleted = new EventEmitter();
   }

  ngOnInit() { }

  removePlace()
  {
    this.placeService.delete(this.place.Id).subscribe(x => { console.log(x); this.onPlaceDeleted.emit(this.place)}, x => alert('Failed to remove Place.'));
  }

  shouldShowRemove(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }

}
