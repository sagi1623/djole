import { Component, OnInit } from '@angular/core';
import {AccommodationType} from '../accommodationtype/accommodationtype.model';
import {AccommodationTypeListService} from './accommodationtype-list.service'
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'accommodationtype-list',
  templateUrl: './accommodationtype-list.component.html',
  styleUrls: ['./accommodationtype-list.component.css'],
  providers: [AccommodationTypeListService]
})
export class AccommodationtypeListComponent implements OnInit {

  accommodationtypes: AccommodationType [];

  constructor(private accommodationtypeService: AccommodationTypeListService)
  {
    this.accommodationtypes=[];
  }

  ngOnInit()
  {
    this.accommodationtypeService.getAll().subscribe(x => this.accommodationtypes = x.json() as AccommodationType[]);
  }

}
