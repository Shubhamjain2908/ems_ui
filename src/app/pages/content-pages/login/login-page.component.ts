import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng5-validation';
import { LoginService } from '../../../services/login.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as alertFunctions from './../../../shared/data/sweet-alerts';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [LoginService]
})

export class LoginPageComponent implements OnInit {

  public error;
  public result: any;
  public submitLoaderClass = '';
  modalReference: NgbModalRef;
  closeResult: string;
  public step = 1;
  forgot_error = '';
  email = '';

  loginForm = new FormGroup({
    email: new FormControl('',
      [Validators.required, CustomValidators.email]),
    password: new FormControl('', [Validators.required])
  });

  forgotForm = new FormGroup({
    email: new FormControl('',
      [Validators.required, Validators.pattern('(^[0789][0-9]{9}$)|(^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$)')])
  });

  newPasswordForm = new FormGroup({
    verify_code: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]{6}$')]),
    password: new FormControl('', [Validators.required]),
    c_password: new FormControl('', [Validators.required])
  });


  constructor(private modalService: NgbModal,
    private _service: LoginService,
    private cookieService: CookieService,
    private _router: Router) { }

  ngOnInit() {
    if (this.cookieService.get('User')) {
      this._router.navigate(['/dashboard']);
    }
  }

  check_login() {
    this.error = '';
  }

  onSubmit() {
    const udata = this.loginForm.value;
    console.log('here')
    this._service.login(udata)
      .subscribe((result: any) => {
        this.cookieService.put('User', 'Bearer ' + result.headers.get('AuthToken'));
        this._router.navigate(['/dashboard']);
      },
        (err: any) => {
          // this.submitLoaderClass="";
          if (err.status === 400) {
            this.error = err.error.message;
          }
          // if (err.status === 0) { console.log('please check your internet connection'); } else
          //   if (err.status === 500) { console.log('oops something went wrong, please try again!!'); } else
          //     if (err.status === 401) { this.error = 'Invalid! Email and password does not match.'; } else
          //       if (err.status === 422) {
          //         if (err.error.message === 'Not registered') {
          //           this.error = 'This account is not registered with us';
          //         } else if (err.error.message === 'invalid password') {
          //           this.error = 'Incorrect Password';
          //         }
          //       }
        },
        () => console.log());
  }
  onSubmitForgot() {
    this.forgot_error = '';
    const data = this.forgotForm.value;
    this._service.forgotPassword(data)
      .subscribe((result: any) => {
        if (result.success === true) {
          this.email = this.forgotForm.value.email;
          this.step = 2;
        } else {
          this.forgot_error = 'Email not match.';
        }
      },
        (err: any) => {
          if (err.status === 406) {
            this.forgot_error = err.error.message;
          }
          if (err.status === 400) {
            this.forgot_error = err.error.message;
          }
          if (err.status === 0) { console.log('please check your internet connection'); } else
            if (err.status === 500) { console.log('oops something went wrong, please try again!!'); }
        },
        () => console.log());
  }

  onSubmitNewPassword() {
    this.forgot_error = '';
    const data = this.newPasswordForm.value;
    data.email = this.email;
    this._service.changePassword(data)
      .subscribe((result: any) => {
        if (result.success === true) {
          this.modalReference.close();
          alertFunctions.typeCustom('Great!', 'Your pasword changed', 'success');
        } else {
          this.forgot_error = 'Invalid OTP';
        }
      },
        (err: any) => {
          // this.submitLoaderClass="";
          if (err.status === 0) { console.log('please check your internet connection'); } else
            if (err.status === 500) { console.log('oops something went wrong, please try again!!'); }
        },
        () => console.log());
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // This function is used in open
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
