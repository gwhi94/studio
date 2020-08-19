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
export class OrgAdminService {

  constructor(private db:AngularFirestore) { }

  addNewMember(memberName, memberEmail, orgId){
    let memberObject= {
      memberDisplayName:memberName,
      memberEmail:memberEmail
    }

    const documentToUpdate = this.db.collection("organizations").doc(orgId);

    return documentToUpdate.update({
      orgMembers:firestore.FieldValue.arrayUnion(memberObject)
    })
      .then(function(){
        return true;
      })
  }

  deleteMember(member, orgId){
   /* 
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
    }) */

    const documentToUpdate = this.db.collection("organizations").doc(orgId);

    var oldMembersArray = [];

    return documentToUpdate.snapshotChanges().pipe(map(res => {
      oldMembersArray  = res.payload.data()['orgMembers'];
      oldMembersArray = oldMembersArray.filter(function(obj){
        return obj.memberEmail !== member.memberEmail
      })

      documentToUpdate.update({
        orgMembers:oldMembersArray
      })
    }))

  }
}
