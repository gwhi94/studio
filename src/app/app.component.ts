import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { StudioFeedService } from './services/studio-feed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'studio';
  isLoggedIn:Boolean;
  orgId:string;
  uid:string;
  displayName:string;
  orgName:string;
  isAdmin:Boolean = false;

  org:Object = {};
  user:Object = {};

  constructor(private authService:AuthService, private dataService:DataService, private studioFeedService:StudioFeedService) { }

  ngOnInit(){
    if(this.authService.isLoggedIn !== true) {
      this.isLoggedIn = false;      
    }else{
      this.isLoggedIn = true;
    }

    this.studioFeedService.getUser()
    .subscribe(res => {    
      let userDecoded = res.payload.data();

      if(userDecoded['admin']){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
      
      this.getOrgDetails(userDecoded['orgId']);
      this.displayName = userDecoded['displayName'];

      this.user = userDecoded;

    })
  
    //need to be able to store the user document/object in the data service. 

  }

  getOrgDetails(orgId){
    this.studioFeedService.getOrg(orgId)
      .subscribe(res => {
        let orgDecoded = res.payload.data();
        this.orgName = orgDecoded['orgName'];

        this.org = orgDecoded;
      })
  }

}


