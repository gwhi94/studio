declare var require: any
import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; 
import { firestore } from 'firebase';
//import * as moment from 'moment';
import * as firebase from 'firebase';
import { CommentsModule } from '../comments/comments.module';


@Injectable({
  providedIn: 'root'
})
export class StudioFeedService {

  constructor(private db:AngularFirestore) { }

  getFeed(orgId){
    return this.db.collection('studio-feed', (ref) => ref.where('orgId', '==', orgId)).valueChanges({idField:'id'});
  }

  postUpdate(newPost, orgId){ 
    // firebase.firestore.FieldValue.serverTimestamp()
    return this.db.collection('studio-feed').add({
      postTitle:newPost.postTitle,
      postContent:newPost.description,
      imageUrl:newPost.imageUrl,
      teamMembers:newPost.teamMembers,
      orgId:orgId ,
      user:newPost.user, 
      comments:[],
      entryCreatedOn:Date.now()
    })
      .then(function(){
        return true;
      })
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

  addComment(postId, author, comment){
    let commentObject = {
      author:author,
      comment:comment,
      entryCreatedOn:Date.now()
    }
    console.log(postId, author, comment);
    const documentToUpdate = this.db.collection('studio-feed').doc(postId);
    return documentToUpdate.update({
      comments:firestore.FieldValue.arrayUnion(commentObject)
    })
    .then(function(){
      return true;
    })
  }

  getComments(postId){
    return this.db.collection('studio-feed').doc(postId).valueChanges();

  }

}
