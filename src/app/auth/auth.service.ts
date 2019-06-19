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
    this.allUsers.map(a => {
      if (a.email === data.email) {
        userExists = true;
        data.error = 'User already exists with this email';
      } else if (a.username === data.username) {
        userExists = true;
        data.error = 'User already exists with this username';
      } else if (a.mobile === data.mobile) {
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
    let userExists = false;
    const type = data.type;
    const id = data.id;
    const password = data.password;
    this.allUsers.map(a => {
      if (type === 'email' && a.email === id && a.password === password) {
        userExists = true;
        return new BehaviorSubject<any>(data);
      } else if (type === 'username' && a.username === id && a.password === password) {
        userExists = true;
        return new BehaviorSubject<any>(data);
      } else if (type === 'mobile' && a.mobile === id && a.password === password) {
        userExists = true;
        return new BehaviorSubject<any>(data);
      }
    });
    if (!userExists) {
      data.error = 'No user exists with this ' + type + ' & password';
    }
    return new BehaviorSubject<any>(data);
  }

  logout() {
    this.cookieService.remove('User');
    this.router.navigate(['/auth/login']);
    this.token = null;
  }

  getToken() {
    return this.token;
  }

  getUsers(): Observable<any> {
    return new BehaviorSubject<any>(this.allUsers);
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
