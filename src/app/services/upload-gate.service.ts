import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadGateService {

  gatedUploads:Array<any> = [];
  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  holdUpload(file){
    this.gatedUploads.push(file);
    console.log(this.gatedUploads);
  }

  sendUploads(){
    this.gatedUploads.forEach(file => {
      this.startUpload(file)    
    });
  }

  startUpload(file) {

    // The storage path
    const path = `studioBucket/${Date.now()}_${file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, file);

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {

        
        this.downloadURL = await ref.getDownloadURL().toPromise();

        console.log(this.downloadURL, path);

        //here we need to take a ref of the download URL and pass it back to the studio comp
        //for posting update
      

        this.db.collection('files').add( { downloadURL: this.downloadURL, path });
      }),
    );
  } 
}
