import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';

declare var require: any;

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component implements OnInit {

  public data: any = [];
  noRecordErr = false;

  constructor(private _httpService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.listing();
  }

  listing() {
    this.noRecordErr = false;
    this.data = [];
    this._httpService.getUsers().subscribe(
      (result: any) => {
        if (result.length > 0) {
          this.data = result;
        } else {
          this.noRecordErr = true;
        }
      },
      (err: any) => {
        console.error(err);
        this._router.navigate(['/auth/logout']);
      },
      () => console.log()
    );
  }

}
