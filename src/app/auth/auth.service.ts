import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  token: string;
  private allUsers = [];

  constructor(private cookieService: CookieService, private router: Router) {
    if (localStorage.getItem('users') != null) {
      this.allUsers = JSON.parse(localStorage.getItem('users'));
    }
  }

  signupUser(data): Observable<any> {
    let user = {};
    let userExists = false;
    const email = data.email;
    const username = data.username;
    const mobile = data.mobile;
    console.log('Map => ', this.allUsers)
    this.allUsers.map(a => {
      if (a.email === email) {
        userExists = true;
        data.error = 'User already exists with this email';
      } else if (a.username === username) {
        userExists = true;
        data.error = 'User already exists with this username';
      } else if (a.mobile === mobile) {
        userExists = true;
        data.error = 'User already exists with this mobile';
      }
    });
    if (!userExists) {
      this.allUsers.push(data);
      localStorage.setItem('users', JSON.stringify(this.allUsers));
    }
    user = data;
    return new BehaviorSubject<any>(user);
  }

  signinUser(data): Observable<any> {
    let user = {};
    let userInfo = new BehaviorSubject<any>(user);
    return userInfo;
  }

  logout() {
    this.cookieService.remove('User');
    this.router.navigate(['/auth/login']);
    this.token = null;
  }

  getToken() {
    return this.token;
  }

  getUsers() {
    return this.allUsers;
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
