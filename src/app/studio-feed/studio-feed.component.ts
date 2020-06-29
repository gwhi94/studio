import { Component, OnInit } from '@angular/core';
import { StudioFeedService } from '../services/studio-feed.service';

import { Post } from '../models/post';

@Component({
  selector: 'app-studio-feed',
  templateUrl: './studio-feed.component.html',
  styleUrls: ['./studio-feed.component.scss']
})
export class StudioFeedComponent implements OnInit {

  posts:Array<any> = [];
  newPostTitle:string;
  public newPost:Post;

  constructor(private studioFeedService:StudioFeedService) { }

  ngOnInit() {
    console.log("Fired once");
    this.getFeed();
  }

  getFeed(){
    console.log("Fired");
    this.studioFeedService.getFeed()
      .subscribe(res => {
        this.posts.length = 0;
        for(let i = 0; i < res.length;i++){
          this.posts.push(res[i].payload.doc.data());
        }
      })
  }

  postUpdate(){
  
    this.newPost.postTitle = this.newPostTitle;
    this.studioFeedService.postUpdate(this.newPost);

    
  }
}
