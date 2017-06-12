import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccommodationType } from "../accommodationtype/accommodationtype.model";
import { AccommodationTypeListService } from "../accommodationtype-list/accommodationtype-list.service";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'accommodationtype',
  templateUrl: './accommodationtype.component.html',
  styleUrls: ['./accommodationtype.component.css']
})
export class AccommodationtypeComponent implements OnInit {
  
  @Input() accommodationtype: AccommodationType
  @Output() onAccommodationTypeDeleted: EventEmitter<AccommodationType>;

  constructor(private accommodationtypeService: AccommodationTypeListService, private userStatusProviderService: UserStatusProviderService)
   {
      this.onAccommodationTypeDeleted = new EventEmitter();
   }

  ngOnInit() { }

  removeAccommodationType()
  {
    this.accommodationtypeService.delete(this.accommodationtype.Id).subscribe(x => { console.log(x); this.onAccommodationTypeDeleted.emit(this.accommodationtype)});
  }

  shouldShowRemove(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }
}
