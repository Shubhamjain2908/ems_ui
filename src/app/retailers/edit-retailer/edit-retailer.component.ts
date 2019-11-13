import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RetailersService } from 'app/services/retailers.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

import * as alertFunctions from '../../shared/data/sweet-alerts';
import { TagActions } from 'app/shared/actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from './../../reducers';

@Component({
  selector: 'app-edit-retailer',
  templateUrl: './edit-retailer.component.html',
  styleUrls: ['./edit-retailer.component.scss'],
  providers: [RetailersService],
})
export class EditRetailerComponent implements OnInit {
  public data: any = [];
  public categories: any = [];
  table_loader_class = 'table_loader';
  table_loader_class2 = '';
  tags$: Observable<any>;
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

  editRetailerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
    email: new FormControl('', [Validators.email]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}/)]),
    policy: new FormGroup({
      id: new FormControl(null),
      policy: new FormControl(''),
      isTwoDay: new FormControl('')
    }),
    tags: new FormControl([], []),
    retailerDetails: new FormGroup({
      shopName: new FormControl('', [Validators.required]),
      dealsIn: new FormControl('', [Validators.required]),
      gstin: new FormControl('', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]),
      panNumber: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]),
      isComposite: new FormControl(''),
      isGstExempted: new FormControl(true),
    }),
    address: new FormArray([new FormGroup({
      id: new FormControl(undefined, []),
      addressLine1: new FormControl('', [Validators.required]),
      addressLine2: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)])
    })])
  });

  constructor(private modalService: NgbModal,
    private _httpService: RetailersService,
    private _router: Router,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {
    this.tags$ = this.store.pipe(select(fromRoot.getAllTags));
  }

  ngOnInit() {
    this.getCategoriesList();
    this.retailerDetails();
    // this.onGstInit();
  }


  searchTags(event) {
    this.store.dispatch(new TagActions.GetTagList({ search: event.query }));
  }


  getCategoriesList() {
    this._httpService.getCategories()
      .subscribe((result: any) => {
        if (result.success === true) {
          console.log(result.data[0]);
          this.categories = result.data;
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }

  onGstInit() {

    if (this.editRetailerForm.controls['retailerDetails']['controls']
    ['isGstExempted'].value) {
      this.editRetailerForm.controls['retailerDetails']['controls']['gstin'].disable();
    } else {
      this.editRetailerForm.controls['retailerDetails']['controls']['gstin'].enable();
    }
    console.log(this.editRetailerForm.value);
    console.log('init function')
    console.log(this.editRetailerForm.controls['retailerDetails']['controls']['gstin'].hasError('pattern'));
    console.log(this.editRetailerForm.controls['retailerDetails']['controls']['gstin'].value);
    if ((this.editRetailerForm.controls['retailerDetails']['controls']['gstin'].value !== null
      && this.editRetailerForm.controls['retailerDetails']['controls']['gstin'].value !== '')
      && !this.editRetailerForm.controls['retailerDetails']['controls']['gstin'].hasError('pattern')) {
      console.log('came in the if');
      this.editRetailerForm.controls['retailerDetails']['controls']['panNumber'].enable();
      this.editRetailerForm.controls['retailerDetails']['controls']['isComposite'].enable();
    } else {
      console.log('came in the else');
      this.editRetailerForm.controls['retailerDetails']['controls']['panNumber'].disable();
      this.editRetailerForm.controls['retailerDetails']['controls']['isComposite'].disable();
    }
  }
  onGstKeyUp(event: any) {
    console.log(event.target.value);
    console.log(this.editRetailerForm.controls['retailerDetails']['controls']['gstin'].hasError('pattern'))
    if (this.editRetailerForm.controls['retailerDetails']['controls']['gstin'].value !== ''
      && !this.editRetailerForm.controls['retailerDetails']['controls']['gstin'].hasError('pattern')) {
      console.log('came in the if');
      this.editRetailerForm.controls['retailerDetails']['controls']['panNumber'].enable();
      this.editRetailerForm.controls['retailerDetails']['controls']['panNumber']
        .setValidators([Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]);
      this.editRetailerForm.controls['retailerDetails']['controls']['isComposite'].enable();
      this.editRetailerForm.controls['retailerDetails']['controls']['isComposite'].setValidators([Validators.required]);
    } else {
      console.log('came in the else');
      this.editRetailerForm.controls['retailerDetails']['controls']['panNumber'].disable();
      this.editRetailerForm.controls['retailerDetails']['controls']['isComposite'].disable();
    }
  }

  ifChecked(event: any) {
    if (event.target.checked) {
      this.editRetailerForm.controls['retailerDetails']['controls']['gstin'].disable();
      this.editRetailerForm.controls['retailerDetails']['controls']['gstin'].patchValue('');
      this.editRetailerForm.controls['retailerDetails']['controls']['panNumber'].disable();
      this.editRetailerForm.controls['retailerDetails']['controls']['panNumber'].patchValue('');
      this.editRetailerForm.controls['retailerDetails']['controls']['isComposite'].disable();
      this.editRetailerForm.controls['retailerDetails']['controls']['isComposite'].patchValue(false);
    } else {
      this.editRetailerForm.controls['retailerDetails']['controls']['gstin'].enable();
    }
  }

  retailerDetails() {
    this.errMsg = false;
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
      let input = {
        id: this.id
      }
      this._httpService.retailer_details(input)
        .subscribe((result: any) => {
          if (result.success === true) {
            this.data = result.data;
            if (!this.data.retailerDetails) {
              delete this.data.retailerDetails;
            }
            if (!this.data.policy) {
              delete this.data.policy;
            }
            this.editRetailerForm.patchValue(this.data);
            console.log(this.data);
            this.onGstInit();
          }
        }, (err: any) => {
          this.errorHandle(err);
        }, () => console.log());
    })
  }

  onUpdateRetailer() {
    const data = this.editRetailerForm.value;
    // console.log('this is the retailer', data);
    data.mobileNumber = data.mobileNumber.toString();
    if (data.retailerDetails.isComposite === '') {
      data.retailerDetails.isComposite = null;
    }
    if (data.retailerDetails.gstin === '') {
      data.retailerDetails.panNumber = '';
      data.retailerDetails.isComposite = null;
    }
    if (data.policy.id === '') {
      delete data.policy.id;
    }
    if (data.address[0].id === null) {
      delete data.address[0].id;
    }
    if (data.policy.id === null) {
      delete data.policy.id;
    }
    if (data.policy.isTwoDay === '') {
      data.policy.isTwoDay = false;
    }
    console.log('this is the retailer', data);
    if (!data.email) { data.email = '' };
    this._httpService.updateRetailer(data, this.id)
      .subscribe((result: any) => {
        if (result.success === true) {
          alertFunctions.typeCustom('Success!', 'Retailer updated!', 'success');
          this.data = result.data;
          this.editRetailerForm.reset();
          this._router.navigate(['/retailers/details/' + result.data.id]);
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
