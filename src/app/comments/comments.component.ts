import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StudioFeedService } from '../services/studio-feed.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() post:Object;
  @Output() postEvent = new EventEmitter<string>();

  newComment:string;
  user:Object;

  constructor(private studioFeedService:StudioFeedService) { }

  ngOnInit() {
    this.studioFeedService.getUser()
      .subscribe(res => {
        this.user = res.payload.data();
      })
    
  }

  addComment(){
    console.log(this.post);
    if(this.newComment){
      var that = this;
      this.studioFeedService.addComment(this.post['id'], this.user, this.newComment)
      .then(function(){
          that.newComment = "";
          that.postEvent.emit(that.post['id']);       
        })
    }
    //(postId, author, comment
  }

}
