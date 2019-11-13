import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { RetailersService } from 'app/services/retailers.service';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-todays-retailers',
  templateUrl: './todays-retailers.component.html',
  styleUrls: ['./todays-retailers.component.scss'],
  providers: [RetailersService]
})
export class TodaysRetailersComponent implements OnInit {
  public data: any = [];

  table_loader_class = 'table_loader';
  table_loader_class2 = '';

  modalReference: NgbModalRef;
  closeResult: string;

  data_count = 0;
  category: any;
  noRecordErr = false;

  page = 1;
  currentPage = 0;
  payload: Object = {
    page: 1,
    limit: 10
  };

  constructor(private modalService: NgbModal,
    private _httpService: RetailersService,
    private _router: Router,

    config: NgbPaginationConfig
  ) {
    config.boundaryLinks = true;
  }

  ngOnInit() {
    this.listing();
  }

  onPager(event: number): void {
    this.page = event;
    this.payload['page'] = event;
    this.listing();
    // console.log('Pager event Is: ', event)
  }

  filterForm = new FormGroup({
    name: new FormControl('')
  });

  filter() {
    const d = this.filterForm.value;
    this.payload['name'] = d['name'];
    this.listing();
  }

  resetFilter() {
    this.filterForm.reset();
    delete this.payload['name'];
    this.listing();
  }
  updateStatus(key, status: boolean) {
    const input = {
      "id": key.id
    };
    if (!status) {
      console.log(key);
      console.log(status)
      this._httpService.block(input)
        .subscribe(
          (result: any) => {
            if (result.success === true) {
              alertFunctions.typeCustom('Retailer!', 'Blocked Successfully!', 'info');
              const index = this.data.retailers.indexOf(key);
              this.data.retailers[index].isActive = status;
            }
          },
          (err) => {
            this.errorHandle(err);
          }, () => console.log()
        );
    } else {
      console.log(key);
      console.log(status)
      this._httpService.unblock(input)
        .subscribe(
          (result: any) => {
            if (result.success === true) {
              alertFunctions.typeCustom('Retailer!', 'Activated Successfully!', 'success');
              const index = this.data.retailers.indexOf(key);
              this.data.retailers[index].isActive = status;
            }
          },
          (err) => {
            this.errorHandle(err);
          }, () => console.log()
        );
    }
  }

  updateStatusApproved(key, status: boolean) {
    const input = {
      "id": key.id
    };
    if (!status) {
      console.log(key);
      console.log(status)
      this._httpService.approve(input)
        .subscribe(
          (result: any) => {
            if (result.success === true) {
              alertFunctions.typeCustom('Retailer!', 'Verified Successfully!', 'success');
              const index = this.data.retailers.indexOf(key);
              this.data.retailers[index].isAdminVerified = !status;
            }
          },
          (err) => {
            this.errorHandle(err);
          }, () => console.log()
        );
    } else {
      console.log(key);
      console.log(status)
      this._httpService.unblock(input)
        .subscribe(
          (result: any) => {
            if (result.code === 200) {
              const index = this.data.retailers.indexOf(key);
              this.data.retailers[index].isActive = status;
            }
          },
          (err) => {
            this.errorHandle(err);
          }, () => console.log()
        );
    }
  }


  listing() {
    this.noRecordErr = false;
    this.table_loader_class = 'table_loader';
    this.data = [];
    this._httpService.todaysListing(this.payload)
      .subscribe((result: any) => {
        this.table_loader_class = '';
        if (result.success === true) {
          this.table_loader_class = '';
          if (result.data.retailers.length > 0) {
            this.data = result.data;
            this.data_count = result.data.count;
          } else {
            this.noRecordErr = true;
          }
        }
      }, (err: any) => {
        this.table_loader_class = '';
        this.errorHandle(err);
      }, () => console.log());
  }
  errorHandle(err) {
    // this.displayMessageError = true;
    if (err.status === 0) {
      // this.message = 'Please check your internet connection';
      alertFunctions.typeCustom('Error!', 'Please check your internet connection', 'warning');
      return;
    } else if (err.status === 500) {
      alertFunctions.typeCustom('Server Error!', 'Internal Server Error', 'error');
    } else if (err.status === 422) {
      alertFunctions.typeCustom('Validation Error!', err.error.message, 'error');
    } else if (err.status === 405) {
      alertFunctions.typeCustom('Not Allowed!', err.error.message, 'error');
    } else if (err.status === 401) {
      this._router.navigate(['/logout']);
    }
    // this.message = JSON.parse(err._body).message;
  }

}
