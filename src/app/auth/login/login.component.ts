import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { noWhitespaceValidator } from 'app/utils/custom-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public error;

  loginForm = new FormGroup({
    id: new FormControl('', [Validators.required, noWhitespaceValidator]),
    password: new FormControl('', [Validators.required, noWhitespaceValidator]),
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    const data = this.loginForm.value;
    const id = data.id;
    if (this.isEmail(id)) {
      data.email = id;
      data.type = 'email';
    } else if (id.match(/^[a-z0-9]+$/i)) {
      data.username = id;
      data.type = 'username';
    } else if (!isNaN(id)) {
      data.mobile = id;
      data.type = 'mobile';
    }
  }

  isEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
