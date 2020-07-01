import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudioFeedComponent } from './studio-feed/studio-feed.component';

import { LoginComponent } from './admin/login/login.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { RegisterComponent } from './admin/register/register.component';  
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {path:'studio', component:StudioFeedComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'verify', component:VerifyEmailComponent},
  {path:'forgot-my-password', component:ForgotPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
