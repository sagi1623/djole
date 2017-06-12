import { Component, OnInit, Input } from '@angular/core';
import { PlaceListService } from "../place-list/place-list.service";
import { Place } from "../place/place.model";
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {

  @Input() place: Place;

  constructor(private placeService: PlaceListService) { }

  ngOnInit() { }

  onSubmit(form: FormGroup)
  {
    if(form.dirty)
    {
    this.placeService.update(this.place).subscribe(x => console.log(x));
    }
  }
}
