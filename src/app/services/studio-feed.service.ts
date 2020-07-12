import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; 
//import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StudioFeedService {

  constructor(private db:AngularFirestore) { }

  getFeed(orgId){
    console.log(orgId);
    return this.db.collection('studio-feed', (ref) => ref.where('orgId', '==', orgId)).snapshotChanges();
  }

  postUpdate(newPost, orgId){ 
    return this.db.collection('studio-feed').add({
      postTitle:newPost.postTitle,
      postContent:newPost.description,
      orgId:orgId  
    });
  }

  getOrganizations(){
    return this.db.collection('organizations').snapshotChanges();
  }

  getUser(){
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    let uid = user['uid'];
    console.log(uid);
    return this.db.collection('users').doc(uid).snapshotChanges();
  }

  getOrg(orgId){
    console.log("hit");
    console.log(orgId);
    return this.db.collection('organizations').doc(orgId).snapshotChanges();
  }

}
