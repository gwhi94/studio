import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; 
//import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StudioFeedService {

  constructor(private db:AngularFirestore) { }

  getFeed(){
    return this.db.collection('studio-feed').snapshotChanges();
  }

  postUpdate(newPost){ 
    return this.db.collection('studio-feed').add({
      postTitle:newPost.postTitle    
    });
  }

  getOrganizations(){
    return this.db.collection('organizations').snapshotChanges();
  }
}
