import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from "../comment/comment.model";
import { CommentListService } from "../comment-list/comment-list.service";
import { UserStatusProviderService } from "../userStatusProvider.service";
import { LocalStorageService } from "../localStorage.service";

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers:[LocalStorageService]
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment
  @Output() onCommentDeleted: EventEmitter<Comment>;
  show: boolean;

  constructor(private commentService: CommentListService, private userStatusProviderService: UserStatusProviderService, private localStorageService: LocalStorageService)
   {
      this.onCommentDeleted = new EventEmitter();
      this.show=false;
   }

  ngOnInit() { }

  removeComment()
  {
    this.commentService.delete(this.comment.AccommodationId,this.comment.CustomerId).subscribe(x => { console.log(x); this.onCommentDeleted.emit(this.comment)});
  }

  shouldShowRemove(): boolean
  {
    if(parseInt(this.localStorageService.get('appUserID'))==this.comment.CustomerId)
    {
      this.show=true;
    }
    return (this.userStatusProviderService.isUserUser() && (this.show));
  }
}
