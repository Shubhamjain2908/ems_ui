import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
// import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate() {
    // const token = this.cookieService.get('User');
     if (this.cookieService.get('User')) {
        // logged in so return true
        return true;
     } else {
        // not logged in so redirect to login page
        this.router.navigate(['/logout']);
        return false;
     }
 }
}
