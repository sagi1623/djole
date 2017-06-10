import { Component, OnInit, Input } from '@angular/core';
import { PlaceListService } from "../place-list/place-list.service";
import { Place } from "../place/place.model";
import { FormGroup } from "@angular/forms/forms";
import { Region } from "../region/region.model";

@Component({
  selector: 'add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css'],
  providers: [PlaceListService]
})
export class AddPlaceComponent implements OnInit {

@Input() region: Region

  constructor(private placeService: PlaceListService) { }

  ngOnInit() {
  }

  onSubmit(p: Place, form: FormGroup)
  {
    form.reset();
    p.RegionId=this.region.Id;
    this.placeService.create(p).subscribe(x => console.log(x));
  }

}
