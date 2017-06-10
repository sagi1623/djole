import { Component, OnInit } from '@angular/core';
import {Place} from '../place/place.model';
import {PlaceListService} from './place-list.service'
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  providers: [PlaceListService]
})
export class PlaceListComponent implements OnInit {
  
  places: Place[];

  constructor(private regionService: PlaceListService)
  {
    this.places=[];
  }

  ngOnInit()
  {
    this.regionService.getAll().subscribe(x => this.places = x.json() as Place[]);
  }

}
