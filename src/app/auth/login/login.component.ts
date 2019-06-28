import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { noWhitespaceValidator } from 'app/utils/custom-validators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie';
import * as alertFunctions from './../../shared/data/sweet-alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public checked = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, noWhitespaceValidator]),
    password: new FormControl('', [Validators.required, noWhitespaceValidator]),
  });

  constructor(private _httpService: AuthService, private cookieService: CookieService, private _router: Router) { }

  ngOnInit() {
    if (this.cookieService.get('User')) {
      this._router.navigate(['/dashboard']);
    }
    if (localStorage.getItem('rememberme') === 'true') {
      this.loginForm.controls['email'].setValue(localStorage.getItem('email'));
      this.loginForm.controls['password'].setValue(localStorage.getItem('password'));
    }
  }

  onSubmit() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberme');
    const data = this.loginForm.value;
    this._httpService.signinUser(data).subscribe(
      (result: any) => {
        if (result.body.success) {
          this.cookieService.put('User', 'Bearer ' + result.headers.get('AuthToken'));
          if (this.checked) {
            localStorage.setItem('email', data.email);
            localStorage.setItem('password', data.password);
            localStorage.setItem('rememberme', 'true');
          }
          this.loginForm.reset();
          this._router.navigate(['/dashboard']);
        } else {
          alertFunctions.typeCustom('Error!', result.body.message, 'error');
        }
      },
      (err: any) => {
        this._router.navigate(['/auth/login']);
      }
    );
  }

  isEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
