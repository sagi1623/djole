import { Component, OnInit } from '@angular/core';
import {AccommodationType} from '../accommodationtype/accommodationtype.model';
import {AccommodationTypeListService} from './accommodationtype-list.service'
import { FormGroup } from "@angular/forms/forms";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'accommodationtype-list',
  templateUrl: './accommodationtype-list.component.html',
  styleUrls: ['./accommodationtype-list.component.css'],
  providers: [AccommodationTypeListService]
})
export class AccommodationtypeListComponent implements OnInit {

  accommodationtypes: AccommodationType [];

  constructor(private accommodationtypeService: AccommodationTypeListService, private userStatusProviderService: UserStatusProviderService)
  {
    this.accommodationtypes=[];
  }

  ngOnInit()
  {
    this.accommodationtypeService.getAll().subscribe(x => this.accommodationtypes = x.json() as AccommodationType[]);
  }
  
  accommodationtypeWasDeleted(accommodationtype: AccommodationType)
  {
    var index = this.accommodationtypes.indexOf(accommodationtype, 0);
    if (index > -1) 
    {
      this.accommodationtypes.splice(index, 1);
    }
  }

  accommodationtypeWasAdded(accommodationtype: AccommodationType)
  {
    this.accommodationtypes.push(accommodationtype);
  }

  shouldShowAdd(): boolean
  {
    return this.userStatusProviderService.isUserAdmin();
  }
}
