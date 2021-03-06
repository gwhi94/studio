import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { StudioFeedService } from '../services/studio-feed.service';

import { Post } from '../models/post';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { UploadGateService } from '../services/upload-gate.service';
import { isNgTemplate } from '@angular/compiler';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
import { UploaderComponent } from '../uploader/uploader.component';

import * as UIkit from 'uikit';

declare var $: any;
declare var UIkit: any;


@Component({
  selector: 'app-studio-feed',
  templateUrl: './studio-feed.component.html',
  styleUrls: ['./studio-feed.component.scss']
})
export class StudioFeedComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  memberCtrl = new FormControl();
  filteredOrgMembers: Observable<string[]>;
  taggedOrgMembers: string[] = [];
  posts:Array<any> = [];
  orgMembers:Array<any> = [];
  uid:string;

  user:Object;

  orgMemberComplete = [];

  org = {};

  orgId:string;

  feedSub$: Subscription;

  newPostTitle:string;
  newPostDescription:string;
  newPostTaggedMembers:Array<string>;
  newPost:Post;

  util = UIkit.util;

  @ViewChild('memberInput',{static: false}) memberInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',{static: false}) matAutocomplete: MatAutocomplete;

  @ViewChild('child',  { static: false }) child:UploaderComponent;

 
  constructor(
    private studioFeedService:StudioFeedService,
    private authService:AuthService,
    private dataService:DataService,
    private uploadGateService:UploadGateService
    )
  
    
    {
    this.filteredOrgMembers = this.memberCtrl.valueChanges.pipe(
      startWith(null),
      map((member: string | null) => member ? this._filter(member) : this.orgMembers.slice()));

      this.newPost = {
        postTitle:"",
        description:"",
        imageUrl:"",
        teamMembers:[],
        user:{}
      };
   }

   add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our member
    if ((value || '').trim()) {
      this.taggedOrgMembers.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.memberCtrl.setValue(null);

  }

  remove(member: string): void {
    const index = this.taggedOrgMembers.indexOf(member);

    if (index >= 0) {
      this.taggedOrgMembers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.taggedOrgMembers.push(event.option.viewValue);
    this.memberInput.nativeElement.value = '';
    this.memberCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.orgMembers.filter(member => member.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.studioFeedService.getUser()
      .subscribe(res => {
        let userDecoded = res.payload.data();
        this.user = userDecoded;
        console.log("USER", this.user);
        this.orgId = userDecoded['orgId'];
        this.getOrgDetails(userDecoded['orgId']);
      })
    
  }

  resetNewPostFields(){
    this.newPost = {
      postTitle:"",
      description:"",
      imageUrl:"",
      teamMembers:[],
      user:{}
    };

    this.taggedOrgMembers.length = 0;
    
    this.child.clearUpload();

    this.UTILITYCloseAccordion();
  
  }

  getOrgDetails(orgId){
    this.studioFeedService.getOrg(orgId)
      .subscribe(res => {
        let orgDecoded = res.payload.data();
        this.org = orgDecoded;
        this.getFeed(this.org['orgId']);
        orgDecoded['orgMembers'].forEach(element => {
          this.orgMembers.push(element.memberDisplayName);  
          this.orgMemberComplete.push(element);      
        });
      })
  }

  getFeed(orgId){
    this.feedSub$ = this.studioFeedService.getFeed(orgId)
      .subscribe(res => {
        this.posts.length = 0;
        for(let i = 0; i < res.length;i++){
          this.posts.push(res[i]);
        }
        this.feedSub$.unsubscribe();
      })
  }

  getComments(postId){
    this.studioFeedService.getComments(postId)
      .subscribe(res => {      
        let postToUpdate = this.posts.filter(obj => obj.id == postId);
        postToUpdate[0]['comments'] = res['comments'];
      })

  }

  removeComment(postId, author){

  }


  getLikes(postId){
    this.studioFeedService.getLikes(postId)
      .subscribe(res => {
        let postToUpdate = this.posts.filter(obj => obj.id == postId);
        postToUpdate[0]['likesRefDictionary'] = res['likesRefDictionary'];
        postToUpdate[0]['likes'] = res['likes'];
      })
  }

  likePost(post){

    if(post.likesRefDictionary.includes(this.user['uid'])){
      var that = this;
      var sub = this.studioFeedService.removeLike(post.id, this.user['uid'])
        .subscribe(res => {
          this.getLikes(post.id);
          sub.unsubscribe();
        })
    }else{
      console.log("Liking post");
      var that = this;
      this.studioFeedService.likePost(post.id, this.user)
        .then(function(){
          that.getLikes(post.id);
          console.log("Fin1");
        })
    }
  }

  //is this even used anymore ?
  hasLiked(post){
    
    for(let i = 0; i < post.likes.length;i++){
       console.log(post.likes[i], this.user['uid']);
       if(post.likes[i].author.uid == this.user['uid']){
         console.log("has liked this");
         return 'liked-post';
       }
     }
  }

  postUpdate(){

    this.newPost.user = this.user;

    if(this.taggedOrgMembers.length > 0){
      this.taggedOrgMembers.forEach(item => {

        var foundMember = this.orgMemberComplete.filter(obj => {
          return obj.memberDisplayName == item;
          
        });

        if(foundMember.length > 0){
          foundMember.forEach(member => {
            this.newPost.teamMembers.push(member);
          })
        }else{
          //not actual team members tagged
          this.newPost.teamMembers.push(item);
        }
      })

    }
     
    if(this.uploadGateService.gatedUploads.length > 0){
      this.uploadGateService.sendUploads()
        .subscribe(res =>{
          console.log(res);
          this.newPost.imageUrl = res;
          console.log(this.newPost); 
          this.studioFeedService.postUpdate(this.newPost, this.org['orgId'])
            .then(res =>{
              this.getFeed(this.orgId);
            })
            
          this.resetNewPostFields();
          //url
        })    
    }else{
       this.studioFeedService.postUpdate(this.newPost, this.org['orgId'])
        .then(res => {
          this.getFeed(this.orgId);
        })
       this.resetNewPostFields();
    }   
  }


 UTILITYCloseAccordion(){

  var teamAccordion = this.util.$('#accordion-team');
  var imageAccordion = this.util.$('#accordion-image');

  if($('#teamAcc').hasClass("uk-open")){
    console.log("open here");
    UIkit.accordion(teamAccordion).toggle();
  }

  if($('#imageAcc').hasClass("uk-open")){
    console.log("open here 2");
    UIkit.accordion(imageAccordion).toggle();
  }
 }
}
