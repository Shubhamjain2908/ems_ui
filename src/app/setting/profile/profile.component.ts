import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as alertFunctions from './../../shared/data/sweet-alerts';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None
})

export class ProfileComponent implements OnInit {
  data: any = {};
  passwordForm = new FormGroup({
    old_password: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
  });

  constructor(private _httpService: AdminService) {
  }

  ngOnInit() {
  }

  changePassword() {
      const data = this.passwordForm.value;
      this._httpService.changePassword(data)
      .subscribe((result: any) => {
        console.log(result);
          if (result.success === true) {
              alertFunctions.typeCustom('Great!', result.message, 'success');
              this.passwordForm.reset();
          }
      }, (err: any) => {
        alertFunctions.typeCustom('Sorry!', err.error.message, 'error');
      }, () => console.log());
  }
}
