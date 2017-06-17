import { Component, OnInit, Input } from '@angular/core';
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";
import { Accommodation } from "../accommodation/accommodation.model";
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'edit-accommodation',
  templateUrl: './edit-accommodation.component.html',
  styleUrls: ['./edit-accommodation.component.css']
})
export class EditAccommodationComponent implements OnInit {

  @Input() accommodation: Accommodation;

  constructor(private accommodationService: AccommodationListService) { }

  ngOnInit() { }

  onSubmit(form: FormGroup)
  {
    if(form.dirty)
    {
      this.accommodationService.update(this.accommodation).subscribe(x => console.log(x), x => alert('Failed to edit Accommodation.'));
    }
  }
}
