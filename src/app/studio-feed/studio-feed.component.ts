import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { StudioFeedService } from '../services/studio-feed.service';

import { Post } from '../models/post';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { UploadGateService } from '../services/upload-gate.service';
import { isNgTemplate } from '@angular/compiler';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';

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

  newPostTitle:string;
  newPostDescription:string;
  newPostTaggedMembers:Array<string>;
  newPost:Post;

  @ViewChild('memberInput',{static: false}) memberInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',{static: false}) matAutocomplete: MatAutocomplete;

 
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

    console.log(this.taggedOrgMembers);
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
    console.log(this.newPost);
    this.studioFeedService.getUser()
      .subscribe(res => {
        let userDecoded = res.payload.data();
        this.user = userDecoded;

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
  }

  getOrgDetails(orgId){
    console.log("hit this");
    this.studioFeedService.getOrg(orgId)
      .subscribe(res => {
        let orgDecoded = res.payload.data();
        console.log(orgDecoded);
        this.org = orgDecoded;
        this.getFeed(this.org['orgId']);
        console.log(this.org);
        orgDecoded['orgMembers'].forEach(element => {
          this.orgMembers.push(element.memberDisplayName);  
          this.orgMemberComplete.push(element);      
        });
        console.log("blach",this.orgMembers);
      })
  }

  getFeed(orgId){
    this.studioFeedService.getFeed(orgId)
      .subscribe(res => {
        this.posts.length = 0;
        for(let i = 0; i < res.length;i++){
          this.posts.push(res[i].payload.doc.data());
        }
        console.log(this.posts);
      })
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
          this.studioFeedService.postUpdate(this.newPost, this.org['orgId']); 
          this.resetNewPostFields();
          //url
        })    
    }else{
       this.studioFeedService.postUpdate(this.newPost, this.org['orgId']); 
       this.resetNewPostFields();
    }   
  }

}
