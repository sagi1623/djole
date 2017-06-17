import { Component, OnInit, Input } from '@angular/core';
import { RegionListService } from "../region-list/region-list.service";
import { Region } from "../region/region.model";
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'edit-region',
  templateUrl: './edit-region.component.html',
  styleUrls: ['./edit-region.component.css']
})
export class EditRegionComponent implements OnInit {

  @Input() region: Region;

  constructor(private regionService: RegionListService) { }

  ngOnInit() { }

  onSubmit(form: FormGroup)
  {
    if(form.dirty)
    {
    this.regionService.update(this.region).subscribe(x => console.log(x), x => alert('Failed to edit Region.'));
    }
  }
}
