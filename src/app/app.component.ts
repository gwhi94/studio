import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'studio';
  isLoggedIn:Boolean;

  constructor(private authService:AuthService) { }

  ngOninit(){
    if(this.authService.isLoggedIn !== true) {
      this.isLoggedIn = false;    
    }else{
      this.isLoggedIn = true;
    }

  }
}
