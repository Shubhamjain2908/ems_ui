import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { CookieService } from 'ngx-cookie';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng5-validation';
import { LoginService } from '../../../services/login.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as fromRoot from '../../../reducers';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';
import { ErrorActions, FormActions } from 'app/shared/actions';
import { map, switchMap, mergeMap, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
@Component({
  selector: 'app-forgot-page',
  templateUrl: './forgot-page.component.html',
  styleUrls: ['./forgot-page.component.scss'],
  providers: [LoginService]
})

export class ForgotPageComponent implements OnInit {

  public error;
  public result: any;
  public submitLoaderClass = '';
  modalReference: NgbModalRef;
  closeResult: string;
  public step = 1;
  forgot_error = '';
  email = '';
  token: string;
  userId: string;
  error$: Observable<string>;
  success$: Observable<boolean>;

  forgotForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });



  constructor(private _service: LoginService,
    private cookieService: CookieService,
    private _router: Router, private store: Store<any>, private route: ActivatedRoute) {
    this.error$ = this.store.pipe(select(fromRoot.getError));
    this.success$ = this.store.pipe(select(fromRoot.getSuccess));
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    if (this.token && this.userId) {
      this._service.checkToken({ userId: this.userId, token: this.token })
        .subscribe((result: any) => {
          this.store.dispatch(new ErrorActions.RemoveError());
          this.store.dispatch(new FormActions.SetSuccessTrue());
        },
          (err: any) => {
            // alertFunctions.typeCustom('Error!', err.error.data.message, 'error');
            this.store.dispatch(new ErrorActions.SetError(err.error.message));
            this.store.dispatch(new FormActions.SetFailureTrue());
          },
          () => console.log());
    } else {
      this._router.navigate(['/login']);
    }
  }


  onSubmit() {
    const udata = this.forgotForm.value;
    this._service.resetPassword(udata, this.token, this.userId)
      .subscribe((result: any) => {
        console.log(result);
        alertFunctions.typeCustom('Great!', result.body.message, 'success');
        setTimeout(() => {
          this._router.navigate(['/login']);
        }, 2000);
      },
        (err: any) => {
          console.log(err);
          if (err.status === 400) {
            alertFunctions.typeCustom('Error!', err.error.message, 'error');
            setTimeout(() => {
              this._router.navigate(['/login']);
            }, 2000);
            return;
          }
        },
        () => console.log());
  }

}
