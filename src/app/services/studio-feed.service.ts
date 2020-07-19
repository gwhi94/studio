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
    return this.db.collection('studio-feed', (ref) => ref.where('orgId', '==', orgId)).snapshotChanges();
  }

  postUpdate(newPost, orgId){ 
    console.log(newPost);
    return this.db.collection('studio-feed').add({
      postTitle:newPost.postTitle,
      postContent:newPost.description,
      imageUrl:newPost.imageUrl,
      teamMembers:newPost.teamMembers,
      orgId:orgId ,
      user:newPost.user, 
    });
  }

  getOrganizations(){
    return this.db.collection('organizations').snapshotChanges();
  }

  getUser(){
    let user = JSON.parse(localStorage.getItem('user'));
    let uid = user['uid'];
    return this.db.collection('users').doc(uid).snapshotChanges();
  }

  getOrg(orgId){
    return this.db.collection('organizations').doc(orgId).snapshotChanges();
  }

}
