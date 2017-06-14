import { Component, OnInit } from '@angular/core';
import { Comment} from '../comment/comment.model';
import { CommentListService} from './comment-list.service'
import { FormGroup } from "@angular/forms/forms";
import { UserStatusProviderService } from "../userStatusProvider.service";

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
  providers: [CommentListService]
})
export class CommentListComponent implements OnInit {

  comments: Comment[];

  constructor(private commentService: CommentListService, private userStatusProviderService: UserStatusProviderService)
  {
    this.comments=[];
  }

  ngOnInit()
  {
    this.commentService.getAll().subscribe(x => this.comments = x.json() as Comment[]);
  }

  commentWasDeleted(comment: Comment)
  {
    var index = this.comments.indexOf(comment, 0);
    if (index > -1) 
    {
      this.comments.splice(index, 1);
    }
  }
}
