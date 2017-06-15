import { Component, OnInit, Input } from '@angular/core';
import { Comment } from "../comment/comment.model";
import { CommentListService } from "../comment-list/comment-list.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { LocalStorageService } from "../localStorage.service";

@Component({
  selector: 'comment-detailed',
  templateUrl: './comment-detailed.component.html',
  styleUrls: ['./comment-detailed.component.css'],
  providers: [CommentListService, LocalStorageService]
})
export class CommentDetailedComponent implements OnInit {

  accId: number = -1;
  appId: number = -1;
  comment: Comment;
  show: boolean;

  constructor(private commentService: CommentListService,private router: Router, private activatedRoute: ActivatedRoute, private userStatusProviderService: UserStatusProviderService, private localStorageService: LocalStorageService)
  {
    this.comment = new Comment();
    activatedRoute.params.subscribe(params => {this.accId = parseInt(params["accId"]); this.appId = parseInt(params["appId"])});
    this.show=false;
  }

  ngOnInit()
  {
    this.commentService.getById(this.accId, this.appId).subscribe(x =>  this.f(x));
  }

  f(x:any)
  {
    this.comment as Comment;
  }
}
