import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss'],
    providers: [AdminService]

})

export class Dashboard1Component implements OnInit {
  dashboard_data: any = {};
  constructor(private _httpService: AdminService, private _router: Router) {
  }

  ngOnInit() {
    this.dashboard();
  }

  dashboard() {
      this._httpService.dashboard()
      .subscribe((result: any) => {
          if (result.success === true) {
            this.dashboard_data = result.data;
          }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }

  errorHandle(err) {
    // this.displayMessageError = true;
    if (err.status === 0) {
      // this.message = 'Please check your internet connection';
      return;
    } else if (err.status === 500) {
      // this.message = 'Server error';
    } else if (err.status === 422) {
      // this.message = 'some validation error';
    } else if (err.status === 401) {
      this._router.navigate(['/logout']);
    }
      // this.message = JSON.parse(err._body).message;
  }

}
