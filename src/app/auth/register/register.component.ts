import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { noWhitespaceValidator, minMaxValidator } from 'app/utils/custom-validators';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  public error;
  public checked = false;

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.pattern(/^[a-z0-9]+$/i)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.minLength(7), Validators.maxLength(10)]),
    address: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.maxLength(30)]),
    name: new FormControl('', [Validators.required, noWhitespaceValidator]),
    password: new FormControl('', [Validators.required,
    Validators.minLength(8),
    Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)]),
    confirmpassword: new FormControl('', [Validators.required,
    Validators.minLength(8),
    Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)]),
  });

  constructor(private _httpService: AuthService, private cookieService: CookieService, private _router: Router) { }

  ngOnInit() {
    if (this.cookieService.get('User')) {
      this._router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    const data = this.registerForm.value;
    if (!this.checked) {
      alert('Please accept the terms & conditions');
    } else {
      delete data.confirmpassword;
      this._httpService.signupUser(data).subscribe(
        (result: any) => {
          if (result.error) {
            alert(result.error);
          } else {
            this.cookieService.put('User', JSON.stringify(result));
            this.registerForm.reset();
            this._router.navigate(['/dashboard']);
          }
        },
        (err: any) => {
          this._router.navigate(['/auth/login']);
          console.error(err);
        }
      );
    }
  }

}
