import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, Subject } from 'rxjs';
import { finalize, tap, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadGateService {

  gatedUploads:Array<any> = [];
  task:AngularFireUploadTask;
  downloadURL:Observable<string>;
  url:string;
  

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  holdUpload(file){

    if(this.gatedUploads.length == 0){
      this.gatedUploads.push(file);
    }
  }

  clearUpload(){
    this.gatedUploads.length = 0;
  }

  sendUploads(){
    const file = this.gatedUploads[0];
    const path = `studioBucket/${Date.now()}_${file.name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);
    // The main task
    this.task = this.storage.upload(path, file);

    var subject = new Subject<string>();

     this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL()
        this.downloadURL.subscribe(url => {
          subject.next(url);                      
        })
      })
      ).subscribe()   
      return subject.asObservable();   
  }
}
