import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from 'app/services/customers.service';
import { Router } from '@angular/router';
import * as alertFunctions from '../../shared/data/sweet-alerts';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
  providers: [CustomersService],
})
export class AddCustomerComponent implements OnInit {
  public data: any = [];
  public categories: any = [];
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

  addCustomerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}/)])
  });

  constructor(private modalService: NgbModal,
    private _httpService: CustomersService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
  }

  onAddCustomer() {
    const data = this.addCustomerForm.value;
    console.log('this is the customer', data);
    data.mobileNumber = data.mobileNumber.toString();
    data.latitude = 1.000;
    data.longitude = 1.000;
    this._httpService.add(data)
      .subscribe((result: any) => {
        if (result.success === true) {
          alertFunctions.typeCustom('Success!', 'Customer added!', 'success');
          this.data.push(result.data);
          this.addCustomerForm.reset();
          this._router.navigate(['/customers']);
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }
  errorHandle(err) {
    // this.displayMessageError = true;
    if (err.status === 406) {
      alertFunctions.typeCustom('Error!', err.error.message, 'error');
    }
    if (err.status === 400) {
      alertFunctions.typeCustom('Error!', err.error.message, 'error');
    }
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
