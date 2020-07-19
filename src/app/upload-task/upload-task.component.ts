import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { UploadGateService } from '../services/upload-gate.service';

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  url;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private uploadGateService:UploadGateService) { }

  ngOnInit() {
    console.log(this.file);
    //this.startUpload();

    var read = new FileReader();
    //read.readAsBinaryString(this.file);
    read.readAsDataURL(this.file);
    var that = this;
    read.onloadend = function(){
      console.log("dd", read.result);
      that.url = read.result;

    }

    this.storeUpload();
  }

  storeUpload(){
    this.uploadGateService.holdUpload(this.file);
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  deleteImage(){

  }

}