import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StudioFeedService } from 'src/app/services/studio-feed.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  organizations = [];
  selectedOrganization:string;
  selectedOrganizationId:string;
  userEmail:string;
  userPassword:string;

  constructor(private authService: AuthService, private studioFeedService:StudioFeedService, private errorService:ErrorService) { }

  ngOnInit() {
    
    console.log(this.userEmail, this.userPassword, this.selectedOrganization);
    
    
    this.studioFeedService.getOrganizations()
      .subscribe(res => {
        console.log(res[0].payload.doc.data());
        let that = this
        res.forEach(function(org){
          that.organizations.push(org.payload.doc.data());
        })
      })
  }

  updateForms(){
    console.log(this.userPassword, this.userEmail, this.selectedOrganization);
  }

  register(){
    this.authService.SignUp(this.userEmail, this.userPassword, this.selectedOrganizationId)
  }

  verifyOrganization(){
    let organization = this.organizations.find(obj => obj.orgName == this.selectedOrganization);
    this.selectedOrganizationId = organization.orgId;

    console.log(this.selectedOrganizationId);
    if(organization.orgMembers.find(obj => obj.memberEmail == this.userEmail)){
      this.register();
    }else{
      this.errorService.showError("Email address not associated with selected organization");
    }
  }
}
