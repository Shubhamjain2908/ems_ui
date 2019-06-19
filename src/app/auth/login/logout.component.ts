import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  posts: any;
  constructor(
    private _httpService: AuthService,
    private _service: CookieService,
    private _router: Router
  ) { }
  ngOnInit() {
    this._httpService.logout();
    // this._httpService.logout().subscribe((result: any) => {
    //   this._service.remove('User');
    //   this._service.remove('email');
    //   this._router.navigate(['/login']);
    // }, (err: any) => {
    //   this._service.remove('User');
    //   this._service.remove('email');
    //   this._router.navigate(['/login']);
    // });
  }

}
