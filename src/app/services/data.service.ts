import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class DataService {
  loggedIn: Boolean = false;
  public loggedIn$: Observable<any> = new BehaviorSubject<any>(this.loggedIn);
  profile_step: any = 1;
  public profile_step$: Observable<any> = new BehaviorSubject<any>(this.profile_step);
  // subcatgory: any = {};
  // public subcategory2Info: BehaviorSubject<any> = new BehaviorSubject<any>(this.subcatgory);
  constructor() { }
}
