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
    username: new FormControl('', [Validators.required, noWhitespaceValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, noWhitespaceValidator]),
    address: new FormControl('', [Validators.required, noWhitespaceValidator]),
    name: new FormControl('', [Validators.required, noWhitespaceValidator]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private _httpService: AuthService, private cookieService: CookieService, private _router: Router) { }

  ngOnInit() {
    if (this.cookieService.get('User')) {
      this._router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    const data = this.registerForm.value;
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
