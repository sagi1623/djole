import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from "../accommodation/accommodation.model";
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { Room } from "../room/room.model";
import { RoomListService } from "../room-list/room-list.service";
import { Comment } from "../comment/comment.model";
import { CommentListService } from "../comment-list/comment-list.service";

@Component({
  selector: 'accommodation-detailed',
  templateUrl: './accommodation-detailed.component.html',
  styleUrls: ['./accommodation-detailed.component.css'],
  providers: [AccommodationListService, RoomListService, CommentListService]
})
export class AccommodationDetailedComponent implements OnInit {

  Id: number = -1;
  accommodation: Accommodation;

  constructor(private accommodationService: AccommodationListService,private router: Router, private activatedRoute: ActivatedRoute, private userStatusProviderService: UserStatusProviderService)
  {
    this.accommodation = new Accommodation();
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
  }

  ngOnInit()
  {
    this.accommodationService.getById(this.Id).subscribe(x =>  this.accommodation = x[0] as Accommodation);
  }

  shouldShowAdd(): boolean
  {
    return this.userStatusProviderService.isUserManager();
  }

  shouldShowEdit(): boolean
  {
    return this.userStatusProviderService.isUserManager();
  }

  roomWasDeleted(room:Room)
  {
    var index = this.accommodation.Rooms.indexOf(room, 0);
    if (index > -1) 
    {
      this.accommodation.Rooms.splice(index, 1);
    }
  }
}
