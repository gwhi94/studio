import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudioFeedService } from './studio-feed.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private userSource = new BehaviorSubject<Object>({});
  private userDataSource = new BehaviorSubject<Object>({});

  user = this.userSource.asObservable();
  userData = this.userSource.asObservable();

  constructor(private studioFeedService:StudioFeedService) { }






}
