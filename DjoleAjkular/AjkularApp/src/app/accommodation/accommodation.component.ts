import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Accommodation } from "../accommodation/accommodation.model";
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
  providers:[AccommodationListService]
})
export class AccommodationComponent implements OnInit {

  @Input() accommodation: Accommodation
  @Output() onAccommodationDeleted: EventEmitter<Accommodation>;

  constructor(private accommodationService: AccommodationListService, private userStatusProviderService: UserStatusProviderService)
   {
      this.onAccommodationDeleted = new EventEmitter();
   }

  ngOnInit() { }

  removeAccommodation()
  {
    this.accommodationService.delete(this.accommodation.Id).subscribe(x => { console.log(x); this.onAccommodationDeleted.emit(this.accommodation)});
  }

  shouldShowRemove(): boolean
  {
    return this.userStatusProviderService.isUserManager(); //manager?
  }
}
