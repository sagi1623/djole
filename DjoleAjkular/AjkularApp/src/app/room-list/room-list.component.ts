import { Component, OnInit } from '@angular/core';
import {Room} from '../room/room.model';
import {RoomListService} from './room-list.service'
import { FormGroup } from "@angular/forms/forms";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
  providers: [RoomListService]
})
export class RoomListComponent implements OnInit {

  rooms: Room[];

  constructor(private roomService: RoomListService, private userStatusProviderService: UserStatusProviderService)
  {
    this.rooms=[];
  }

  ngOnInit()
  {
    this.roomService.getAll().subscribe(x => this.rooms = x.json() as Room[]);
  }

  roomWasDeleted(room: Room)
  {
    var index = this.rooms.indexOf(room, 0);
    if (index > -1) 
    {
      this.rooms.splice(index, 1);
    }
  }
}
