import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { SuppliersService } from 'app/services/suppliers.service';
import { Router } from '@angular/router';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-todays-suppliers',
  templateUrl: './todays-suppliers.component.html',
  styleUrls: ['./todays-suppliers.component.scss'],
  providers: [SuppliersService, NgbPaginationConfig]
})
export class TodaysSuppliersComponent implements OnInit {

  public data: any = [];
  data_count = 0;
  table_loader_class = 'table_loader';
  table_loader_class2 = '';

  modalReference: NgbModalRef;
  closeResult: string;

  category: any;
  noRecordErr = false;

  page = 1;
  currentPage = 0;
  payload: Object = {
    page: 1,
    limit: 10
  };
  filterForm = new FormGroup({
    name: new FormControl('')
  });
  constructor(private modalService: NgbModal,
    private _httpService: SuppliersService,
    private _router: Router,
    config: NgbPaginationConfig) {
    config.boundaryLinks = true;
  }

  onPager(event: number): void {
    this.page = event;
    this.payload['page'] = event;
    this.listing();

    // console.log('Pager event Is: ', event)
  }
  updateStatus(key, status: boolean) {
    console.log('this is the key', key);
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
              alertFunctions.typeCustom('Supplier!', 'Blocked Successfully!', 'info');
              const index = this.data.suppliers.indexOf(key);
              this.data.suppliers[index].isActive = status;
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
              alertFunctions.typeCustom('Supplier!', 'Activated Successfully!', 'success');
              const index = this.data.suppliers.indexOf(key);
              this.data.suppliers[index].isActive = status;
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
              alertFunctions.typeCustom('Supplier!', 'Verified Successfully!', 'success');
              const index = this.data.suppliers.indexOf(key);
              this.data.suppliers[index].isAdminVerified = !status;
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
              const index = this.data.suppliers.indexOf(key);
              this.data.suppliers[index].isActive = status;
            }
          },
          (err) => {
            this.errorHandle(err);
          }, () => console.log()
        );
    }
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
  ngOnInit() {
    this.listing();
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
          if (result.data.suppliers.length > 0) {
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

}
