import { Component, OnInit } from '@angular/core';
import { StudioFeedComponent } from '../studio-feed/studio-feed.component';
import { StudioFeedService } from '../services/studio-feed.service';
import { OrgAdminService } from '../services/org-admin.service';
import { ErrorService } from '../services/error.service';

import * as UIkit from 'uikit';

@Component({
  selector: 'app-org-admin',
  templateUrl: './org-admin.component.html',
  styleUrls: ['./org-admin.component.scss']
})
export class OrgAdminComponent implements OnInit {

  data:Object = {}

  orgId:string;
  uid:string;
  displayName:string;
  orgName:string;
 
  org:Object = {};
  user:Object = {};

  memberName = "";
  memberEmail = "";

  constructor(private studioFeedService:StudioFeedService, private errorService:ErrorService, private orgAdminService:OrgAdminService) { }

  ngOnInit() {
    console.log(history.state.data);

    if(history.state.data == undefined){
      this.studioFeedService.getUser()
      .subscribe(res => {    
        let userDecoded = res.payload.data();         
        this.getOrgDetails(userDecoded['orgId']);
        this.user = userDecoded; 
      })
    }else{
      this.org = history.state.data.org;
      this.user = history.state.data.user;
    }
  }

  getOrgDetails(orgId){
    this.studioFeedService.getOrg(orgId)
      .subscribe(res => {
        let orgDecoded = res.payload.data();
        this.org = orgDecoded;

        console.log(this.org);
      })
  }


  addMember(){
    for(let i=0;i < this.org['orgMembers'].length;i++){
      if(this.org['orgMembers'][i].memberEmail == this.memberEmail){
        //already exists
        this.errorService.showError("Member with that email already exists");
      }else{
        var that = this;
        this.orgAdminService.addNewMember(this.memberName, this.memberEmail, this.org['orgId'])
          .then(function(){
            UIkit.modal('#memberModal').hide();
            that.errorService.showSuccess("User Added");
          })
      }
    }
  }

  deleteMember(member){
    
    this.orgAdminService.deleteMember(member, this.org['orgId'])
      .subscribe(res => {
        console.log("deleted member");
      })
  }
}


//Org is created
//Admin user is created
//Admin user adds org members

//User creates account
