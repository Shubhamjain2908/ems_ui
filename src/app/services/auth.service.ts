import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class AuthService {

  constructor(private cookieService: CookieService, private router: Router, private http: BaseService) { }

  signupUser(data): Observable<any> {
    return this.http.postDirectObserve('signup', data);
  }

  signinUser(data): Observable<any> {
    return this.http.postDirectObserve('login', data);
  }

  getUser(): Observable<any> {
    return this.http.get('user');
  }

  updateUser(data): Observable<any> {
    return this.http.put('user', data);
  }

  logout() {
    return this.http.delete('logout');
  }

  isAuthenticated() {
    if (this.cookieService.get('User')) {
      return true;
    } else {
      this.router.navigate(['/auth/logout']);
      return false;
    }
  }
}
