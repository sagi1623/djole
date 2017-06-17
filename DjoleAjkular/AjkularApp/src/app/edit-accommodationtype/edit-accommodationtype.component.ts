import { Component, OnInit, Input } from '@angular/core';
import { AccommodationTypeListService } from "../accommodationtype-list/accommodationtype-list.service";
import { AccommodationType } from "../accommodationtype/accommodationtype.model";
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'edit-accommodationtype',
  templateUrl: './edit-accommodationtype.component.html',
  styleUrls: ['./edit-accommodationtype.component.css']
})
export class EditAccommodationtypeComponent implements OnInit {

  @Input() accommodationtype: AccommodationType;

  constructor(private accommodationtypeService: AccommodationTypeListService) { }

  ngOnInit() { }

  onSubmit(form: FormGroup)
  {
    if(form.dirty)
    {
    this.accommodationtypeService.update(this.accommodationtype).subscribe(x => console.log(x), x => alert('Failed to edit AccommodationType.'));
    }
  }
}
