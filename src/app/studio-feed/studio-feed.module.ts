import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudioFeedComponent } from './studio-feed.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StudioFeedComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class StudioFeedModule { }

//https://www.positronx.io/full-angular-7-firebase-authentication-system/
//https://github.com/SinghDigamber/angularfirebase-authentication/blob/master/src/app/shared/routing/app-routing.module.ts

