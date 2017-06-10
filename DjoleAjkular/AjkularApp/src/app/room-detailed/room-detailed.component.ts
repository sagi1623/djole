import { Component, OnInit, Input } from '@angular/core';
import { Room } from "../room/room.model";
import { RoomListService } from "../room-list/room-list.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'room-detailed',
  templateUrl: './room-detailed.component.html',
  styleUrls: ['./room-detailed.component.css'],
  providers: [RoomListService]
})
export class RoomDetailedComponent implements OnInit {

  Id: number = -1;
  room: Room;

  constructor(private roomService: RoomListService,private router: Router, private activatedRoute: ActivatedRoute)
  {
    this.room = new Room();
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
  }

  ngOnInit()
  {
    this.roomService.getById(this.Id).subscribe(x =>  this.room = x[0] as Room);
  }

}
