import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudioFeedComponent } from './studio-feed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UploaderComponent } from '../uploader/uploader.component';
import { DropzoneDirective } from '../dropzone.directive';
import { UploadTaskComponent } from '../upload-task/upload-task.component';


@NgModule({
  declarations: [
    StudioFeedComponent,
    UploaderComponent,
    DropzoneDirective,
    UploadTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,

  ]
})
export class StudioFeedModule { }

//https://www.positronx.io/full-angular-7-firebase-authentication-system/
//https://github.com/SinghDigamber/angularfirebase-authentication/blob/master/src/app/shared/routing/app-routing.module.ts

