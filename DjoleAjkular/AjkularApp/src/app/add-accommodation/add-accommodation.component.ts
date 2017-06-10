import { Component, OnInit, Input } from '@angular/core';
import { AccommodationType } from "../accommodationtype/accommodationtype.model";

@Component({
  selector: 'add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css']
})
export class AddAccommodationComponent implements OnInit {

  @Input() accommodationtype: AccommodationType
  
  constructor() { }

  ngOnInit() {
  }

}
