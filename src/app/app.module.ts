import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";

import { StudioFeedModule } from './studio-feed/studio-feed.module';
import { UpdateComponent } from './update/update.component';
import { LoginComponent } from './admin/login/login.component';

import { AuthService } from './services/auth.service';
import { RegisterComponent } from './admin/register/register.component';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material';
import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';



@NgModule({
  declarations: [
    AppComponent,
    UpdateComponent,
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    //DropzoneDirective,
    //UploaderComponent,
    //UploadTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'studio'),
    AngularFirestoreModule,
    StudioFeedModule,
    AngularFireAuthModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
