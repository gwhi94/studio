import { Component } from '@angular/core';
import { UploadGateService } from '../services/upload-gate.service';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

  constructor(private uploadGateService:UploadGateService){}

  isHovering: boolean;

  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    console.log(this.files.length);
   
    if(this.files.length == 0){
      for (let i = 0; i < files.length; i++) {
        this.files.push(files.item(i));
      }
    }
  }

  clearUpload(){ 
    this.uploadGateService.clearUpload();
    this.files.length = 0;

  }
}