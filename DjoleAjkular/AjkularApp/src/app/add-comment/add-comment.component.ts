import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentListService } from "../comment-list/comment-list.service";
import { Comment } from "../comment/comment.model";
import { FormGroup } from "@angular/forms/forms";
import { Accommodation } from "../accommodation/accommodation.model";
import { LocalStorageService } from "../localStorage.service";

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
  providers: [CommentListService, LocalStorageService]
})
export class AddCommentComponent implements OnInit {

  @Input() accommodation: Accommodation;
  @Output() onCommentAdded: EventEmitter<Comment>;

  constructor(private commentService: CommentListService, private localStorageService: LocalStorageService) 
  { 
    this.onCommentAdded = new EventEmitter();
  }

  ngOnInit() { }

  onSubmit(c: Comment, form: FormGroup)
  {
    form.reset();
    c.AccommodationId=this.accommodation.Id;
    c.CustomerId=parseInt(this.localStorageService.get('appUserID'));
    //c.CustomerId=1;
    this.commentService.create(c).subscribe(x => this.accommodation.Comments.push(x as Comment));
  }
}
