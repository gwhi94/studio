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


  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private uploadGateService:UploadGateService) { }

  ngOnInit() {
    console.log(this.file);
    //this.startUpload();

    this.storeUpload();
  }

  storeUpload(){

    this.uploadGateService.holdUpload(this.file);

  }


  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}