import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  public token: string;
  private loggedIn = false;

  constructor(private http: BaseService) {
  }

  login(data): Observable<any> {
    return this.http.postDirectAdminObserve('login', data);
  }
  forgotPassword(data): Observable<any> {
    return this.http.getDirectAdmin('forgot-password', { email: data.email });
  }

  resetPassword(data, token, userId): Observable<any> {
    return this.http.postDirectAdminObserve('reset-password?token=' + token + '&userId=' + userId, data);
  }

  checkToken(data): Observable<any> {
    return this.http.getDirectAdmin('check-token', data);
  }

  sendOtp(data): Observable<any> {
    return this.http.postDirectAdminObserve('resend-otp', data);
  }

  verifyMobile(data): Observable<any> {
    return this.http.postDirectAdminObserve('verify-otp', data);
  }

  verifyEmail(data): Observable<any> {
    return this.http.getDirectAdmin('verify', data);
  }

  changePassword(data): Observable<any> {
    return this.http.postAdmin('admin/resetPassword', data);
  }
  registerUser(data) {
    return this.http.postAdmin('registration', data);
  }

  logout() {
    return this.http.getAdmin('logout', {});
    // this.token = null;
    // localStorage.removeItem('currentUser');
  }
}
