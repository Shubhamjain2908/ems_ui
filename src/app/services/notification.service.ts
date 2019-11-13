import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
// import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';

@Injectable()
export class NotificationService {
  constructor(private http: BaseService, private cookieService: CookieService) {
  }


  sendNotification(data): Observable<any> {
    return this.http.postAdmin('notification', data);
  }

}
