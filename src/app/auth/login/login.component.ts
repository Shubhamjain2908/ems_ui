import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { noWhitespaceValidator } from 'app/utils/custom-validators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public error;
  public checked = true;

  loginForm = new FormGroup({
    id: new FormControl('', [Validators.required, noWhitespaceValidator]),
    password: new FormControl('', [Validators.required, noWhitespaceValidator]),
  });

  constructor(private _httpService: AuthService, private cookieService: CookieService, private _router: Router) { }

  ngOnInit() {
    if (this.cookieService.get('User')) {
      this._router.navigate(['/dashboard']);
    }
    if (localStorage.getItem('rememberme') === 'true') {
      this.loginForm.controls['id'].setValue(localStorage.getItem('id'));
      this.loginForm.controls['password'].setValue(localStorage.getItem('password'));
    }
  }

  onSubmit() {
    localStorage.removeItem('id');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberme');
    const data = this.loginForm.value;
    const id = data.id;
    if (this.isEmail(id)) {
      data.type = 'email';
    } else if (!isNaN(id)) {
      data.type = 'mobile';
    } else if (id.match(/^[a-z0-9]+$/i)) {
      data.type = 'username';
    } else {
      alert('Enter a valid id');
      return;
    }
    this._httpService.signinUser(data).subscribe(
      (result: any) => {
        if (result.error) {
          alert(result.error);
        } else {
          this.cookieService.put('User', JSON.stringify(result));
          if (this.checked) {
            localStorage.setItem('id', id);
            localStorage.setItem('password', data.password);
            localStorage.setItem('rememberme', 'true');
          }
          this.loginForm.reset();
          this._router.navigate(['/dashboard']);
        }
      },
      (err: any) => {
        this._router.navigate(['/auth/login']);
        console.error(err);
      }
    );
  }

  isEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
