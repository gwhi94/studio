import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent implements OnInit {

  error: any;
  user = {email:'', password:''};
  constructor(private authService:AuthService) {}



  ngOnInit() {
  }

  logIn(){
    console.log(this.user);
    this.authService.SignIn(this.user.email, this.user.password);
  }

}
