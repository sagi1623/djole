import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from "../accommodation/accommodation.model";

@Component({
  selector: 'accommodation-map',
  templateUrl: './accommodation-map.component.html',
  styleUrls: ['./accommodation-map.component.css'],
  styles: ['agm-map {height: 300px; width: 500px;}'] //postavljamo sirinu i visinu mape
})
export class AccommodationMapComponent implements OnInit {

@Input() accommodation: Accommodation;

  constructor() { }

  ngOnInit() {
  }

}
