import { Component, OnInit } from '@angular/core';
import { StudioFeedService } from '../services/studio-feed.service';

import { Post } from '../models/post';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  newPostTitle:string;

  public newPost:Post;

  constructor(private studioFeedService:StudioFeedService, private authService:AuthService) {
    this.newPost = new Post();
   }

  ngOnInit() {

  }

  isUserLoggedIn(){

  }
  
  postUpdate(){
  
    this.newPost.postTitle = this.newPostTitle;

   // this.studioFeedService.postUpdate(this.newPost);

    
  }
}
