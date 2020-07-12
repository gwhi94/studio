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
  userEmail:string;
  userPassword:string;


  constructor(private authService:AuthService) {}



  ngOnInit() {
  }

  logIn(){
    this.authService.SignIn(this.userEmail, this.userPassword);
  }

}
