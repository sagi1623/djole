import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from "../accommodation/accommodation.model";
import { AccommodationListService } from "../accommodation-list/accommodation-list.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { Room } from "../room/room.model";
import { RoomListService } from "../room-list/room-list.service";
import { Comment } from "../comment/comment.model";
import { CommentListService } from "../comment-list/comment-list.service";
import { LocalStorageService } from "../localStorage.service";
import { URLProviderService } from "../URLProvider.service";

@Component({
  selector: 'accommodation-detailed',
  templateUrl: './accommodation-detailed.component.html',
  styleUrls: ['./accommodation-detailed.component.css'],
  providers: [AccommodationListService, RoomListService, CommentListService, LocalStorageService, URLProviderService]
})
export class AccommodationDetailedComponent implements OnInit {

  Id: number = -1;
  accommodation: Accommodation;
  show: boolean;
  img: string;

  constructor(private accommodationService: AccommodationListService,private router: Router, private activatedRoute: ActivatedRoute, private userStatusProviderService: UserStatusProviderService, private localStorageService: LocalStorageService, private urlProviderService: URLProviderService)
  {
    this.accommodation = new Accommodation();
    this.accommodation.ImageUrl="";
    activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])}); 
    this.show=false; 
    this.img="";
  }

  ngOnInit()
  {
    this.accommodationService.getById(this.Id).subscribe(x => this.f(x));
    
  }

  f(x: any)
  {
    this.accommodation = x[0] as Accommodation;
    this.img=this.urlProviderService.getURL()+this.accommodation.ImageUrl;
    console.log(this.accommodation.ImageUrl);
  }

  shouldShowAdd(): boolean
  {
    if(parseInt(this.localStorageService.get('appUserID'))==this.accommodation.AppUserId)
    {
      this.show=true;
    }
    return (this.userStatusProviderService.isUserManager() && (this.show));
  }

  shouldShowAddComment(): boolean
  {
    return this.userStatusProviderService.isUserUser();
  }

  shouldShowEdit(): boolean
  {
    if(parseInt(this.localStorageService.get('appUserID'))==this.accommodation.AppUserId)
    {
      this.show=true;
    }
    return (this.userStatusProviderService.isUserManager() && (this.show));
  }

  roomWasDeleted(room:Room)
  {
    var index = this.accommodation.Rooms.indexOf(room, 0);
    if (index > -1) 
    {
      this.accommodation.Rooms.splice(index, 1);
    }
  }

  commentWasDeleted(comment:Comment)
  {
    var index = this.accommodation.Comments.indexOf(comment, 0);
    if (index > -1) 
    {
      this.accommodation.Comments.splice(index, 1);
    }
  }
}
