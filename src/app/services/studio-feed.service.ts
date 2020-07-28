declare var require: any
import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; 
import { firestore } from 'firebase';
//import * as moment from 'moment';
import * as firebase from 'firebase';
import { CommentsModule } from '../comments/comments.module';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/typings/overlay-directives';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudioFeedService {

  constructor(private db:AngularFirestore) { }

  getFeed(orgId){
    return this.db.collection('studio-feed', (ref) => ref.where('orgId', '==', orgId)
      .orderBy("entryCreatedOn", "desc"))
        .valueChanges({idField:'id'});
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
      likes:[],
      likesRefDictionary:[],
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

  getLikes(postId){
    return this.db.collection('studio-feed').doc(postId).valueChanges();
  }


  likePost(postId, author){
    console.log("ADDING LIKE");
    let likeObject = {
      author:author,
      entryCreatedOn:Date.now()
    }
    var that = this;
    const documentToUpdate = this.db.collection('studio-feed').doc(postId);

    return documentToUpdate.update({
      likes:firestore.FieldValue.arrayUnion(likeObject),
      likesRefDictionary:firestore.FieldValue.arrayUnion(likeObject.author.uid)
    })
    .then(function(){
      that.getLikes(postId);
    })
   
  }

  removeLike(postId, authorId){
    console.log("REMOVING LIKE");
    const documentToUpdate = this.db.collection('studio-feed').doc(postId);
    var oldLikesArray = [];

    return documentToUpdate.snapshotChanges().pipe(map(res => {
    
      oldLikesArray = res.payload.data()['likes'];
      oldLikesArray = oldLikesArray.filter(function(obj){
        return obj.author.uid !== authorId
      })
      documentToUpdate.update({
        likesRefDictionary:firestore.FieldValue.arrayRemove(authorId),
        likes:oldLikesArray
      })     
    })
   
    )}
}
