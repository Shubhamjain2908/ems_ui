import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss'],
  providers: [DashboardService]
})

export class Dashboard1Component implements OnInit {
  data: any = {};
  constructor(private _httpService: DashboardService, private _router: Router) {
  }

  ngOnInit() {
    this.dashboard();
  }

  dashboard() {
    this.data = {};
    this._httpService.dashboard()
      .subscribe((result: any) => {
        if (result.success === true) {
          this.data = result.data;
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
