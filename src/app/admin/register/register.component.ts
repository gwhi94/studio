import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StudioFeedService } from 'src/app/services/studio-feed.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  organizations = [];
  selectedOrganization:string;
  userEmail:string;
  userPassword:string;

  constructor(private authService: AuthService, private studioFeedService:StudioFeedService) { }

  ngOnInit() {
    this.studioFeedService.getOrganizations()
      .subscribe(res => {
        console.log(res[0].payload.doc.data());
        let that = this
        res.forEach(function(org){
          that.organizations.push(org.payload.doc.data());
        })
      })
  }

  register(){
    this.authService.SignUp(this.userEmail, this.userPassword)
  }

  verifyOrganization(){
    console.log(this.selectedOrganization, this.organizations, this.userEmail, this.userPassword);

    let organization = this.organizations.find(obj => obj.orgName == this.selectedOrganization);

    console.log(organization);

    if(organization.orgMembers.find(obj => obj.memberEmail == this.userEmail)){
      this.register();
    }else{
      console.log("User not in org members");
    }
    
  }

}
