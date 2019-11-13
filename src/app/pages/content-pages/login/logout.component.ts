import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { LoginService } from 'app/services/login.service';


@Component({
  selector: 'app-logout',
  template: '',
  providers: [LoginService]
})
export class LogoutComponent implements OnInit {
  posts: any;
  constructor(
    private _service: CookieService,
    private _router: Router,
    private _httpService: LoginService
  ) { }
  ngOnInit() {
    this._httpService.logout().subscribe((result: any) => {
      this._service.remove('User');
      this._router.navigate(['/login']);
    }, (err: any) => {
      this._service.remove('User');
      this._router.navigate(['/login']);
    });
  }

}
