import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from 'app/services/customers.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

import * as alertFunctions from '../../shared/data/sweet-alerts';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
  providers: [CustomersService],
})
export class EditCustomerComponent implements OnInit {
  public data: any = [];
  public categories: any = [];
  table_loader_class = 'table_loader';
  table_loader_class2 = '';

  modalReference: NgbModalRef;
  closeResult: string;
  errMsg: boolean;
  category: any;
  noRecordErr = false;
  id: any;
  page = 1;
  currentPage = 0;
  payload: Object = {
    page: 1,
    limit: 10
  };

  editCustomerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}/)])
  });

  constructor(private modalService: NgbModal,
    private _httpService: CustomersService,
    private _router: Router,
    private route: ActivatedRoute,

  ) {
  }

  ngOnInit() {
    this.customerDetails();
  }



  customerDetails() {
    this.errMsg = false;
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
      let input = {
        id: this.id
      }
      this._httpService.customer_details(input)
        .subscribe((result: any) => {
          if (result.success === true) {
            this.data = result.data;
            this.editCustomerForm.patchValue(this.data);
            console.log(this.data);
          }
        }, (err: any) => {
          this.errorHandle(err);
        }, () => console.log());
    })
  }

  onUpdateCustomer() {
    const data = this.editCustomerForm.value;
    // console.log('this is the customer', data);
    data.mobileNumber = data.mobileNumber.toString();
    console.log('this is the customer', data);
    this._httpService.updateCustomer(data, this.id)
      .subscribe((result: any) => {
        if (result.success === true) {
          alertFunctions.typeCustom('Success!', 'Customer updated!', 'success');
          this.data = result.data;
          this.editCustomerForm.reset();
          this._router.navigate(['/customers/details/' + result.data.id]);
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
