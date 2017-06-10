import { Component, OnInit, Input } from '@angular/core';
import { AccommodationType } from "../accommodationtype/accommodationtype.model";

@Component({
  selector: 'accommodationtype',
  templateUrl: './accommodationtype.component.html',
  styleUrls: ['./accommodationtype.component.css']
})
export class AccommodationtypeComponent implements OnInit {

@Input() accommodationtype: AccommodationType

  constructor() { }

  ngOnInit() {
  }

}
