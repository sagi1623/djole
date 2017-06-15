import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Accommodation } from "../accommodation/accommodation.model";
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { LocalStorageService } from "../localStorage.service";

@Component({
  selector: 'unapproved-accommodation',
  templateUrl: './unapproved-accommodation.component.html',
  styleUrls: ['./unapproved-accommodation.component.css'],
  providers:[AccommodationListService, LocalStorageService]
})
export class UnapprovedAccommodationComponent implements OnInit {

  @Input() accommodation: Accommodation
  @Output() onAccommodationDeleted: EventEmitter<Accommodation>;
  show: boolean;

  constructor(private accommodationService: AccommodationListService, private userStatusProviderService: UserStatusProviderService, private localStorageService: LocalStorageService)
  {
    this.onAccommodationDeleted = new EventEmitter();
    this.show=false;
  }

  ngOnInit() { }
  
  removeAccommodation()
  {
    this.accommodationService.delete(this.accommodation.Id).subscribe(x => { console.log(x); this.onAccommodationDeleted.emit(this.accommodation)});
  }

  approveAccommodation()
  {
    this.accommodation.Approved=true;
    this.accommodationService.update(this.accommodation).subscribe(x => console.log(x));
  }

  shouldShowRemove(): boolean
  {
    if(parseInt(this.localStorageService.get('appUserID'))==this.accommodation.AppUserId)
    {
      this.show=true;
    }
    return (this.userStatusProviderService.isUserManager() && (this.show));
  }

  shouldShowApprove(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }
}
