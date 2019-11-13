import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
// import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AdminService {
  constructor(private http: BaseService, private cookieService: CookieService) {
  }

  changePassword(data) {
    const emailId = this.cookieService.get('UserEmail');
    let dataToPass = {
      email: emailId,
      oldPassword: data.old_password,
      newPassword: data.password
    }
    return this.http.postAdmin('change-password', dataToPass);
  }

  dashboard() {
    return this.http.getAdmin('dashboard', '');
  }

}
