import { Component, OnInit } from '@angular/core';
import {Room} from '../room/room.model';
import {RoomListService} from './room-list.service'
import { FormGroup } from "@angular/forms/forms";

@Component({
  selector: 'room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
  providers: [RoomListService]
})
export class RoomListComponent implements OnInit {

  rooms: Room[];

  constructor(private roomService: RoomListService)
  {
    this.rooms=[];
  }

  ngOnInit()
  {
    this.roomService.getAll().subscribe(x => this.rooms = x.json() as Room[]);
  }

}
