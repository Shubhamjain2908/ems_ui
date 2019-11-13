import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RetailersService } from 'app/services/retailers.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { SuppliersService } from 'app/services/suppliers.service';
import * as fromRoot from './../../reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TagActions } from 'app/shared/actions';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss'],
  providers: [SuppliersService],
})
export class EditSupplierComponent implements OnInit {
  public data: any = [];
  public categories: any = [];
  isDisabled: boolean;
  table_loader_class = 'table_loader';
  table_loader_class2 = '';
  tags$: Observable<any>;
  public supplierTypes: any = [];
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

  editSupplierForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tags: new FormControl([], []),
    oneops_margin: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(1)]),
    shiprocket_margin: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(1)]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}/)]),
    policy: new FormGroup({
      id: new FormControl(null),
      policy: new FormControl(''),
      isTwoDay: new FormControl('')
    }),
    // password: new FormControl('', [Validators.required]),
    supplierDetails: new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      supplierTypes: new FormControl([], [Validators.required]),
      dealsIn: new FormControl('', [Validators.required]),
      gstin: new FormControl('', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]),
      // signature: new FormControl('', [Validators.required]),
      panNumber: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]),
      isComposite: new FormControl(''),
      supplyProductType: new FormControl('', [Validators.required]),
      addressLine1: new FormControl('', [Validators.required]),
      addressLine2: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)])
    })
  });

  constructor(private modalService: NgbModal,
    private _httpService: SuppliersService,
    private _router: Router,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {
    this.tags$ = this.store.pipe(select(fromRoot.getAllTags));
  }

  ngOnInit() {
    this.getSupplierTypeList();
    this.getCategoriesList();
    this.retailerDetails();
    // this.onGstInit();
  }

  searchTags(event) {
    this.store.dispatch(new TagActions.GetTagList({ search: event.query }));
  }

  onGstInit() {
    console.log(this.editSupplierForm.value);
    console.log('init function')
    console.log(this.editSupplierForm.controls['supplierDetails']['controls']['gstin'].hasError('pattern'));
    console.log(this.editSupplierForm.controls['supplierDetails']['controls']['gstin'].value);
    if (this.editSupplierForm.controls['supplierDetails']['controls']['gstin'].value !== ''
      && !this.editSupplierForm.controls['supplierDetails']['controls']['gstin'].hasError('pattern')) {
      console.log('came in the if');
      this.editSupplierForm.controls['supplierDetails']['controls']['panNumber'].enable();
      this.editSupplierForm.controls['supplierDetails']['controls']['isComposite'].enable();
    } else {
      console.log('came in the else');
      this.editSupplierForm.controls['supplierDetails']['controls']['panNumber'].disable();
      this.editSupplierForm.controls['supplierDetails']['controls']['isComposite'].disable();
    }
  }
  onGstKeyUp(event: any) {
    console.log(event.target.value);
    console.log(this.editSupplierForm.controls['supplierDetails']['controls']['gstin'].hasError('pattern'))
    if (this.editSupplierForm.controls['supplierDetails']['controls']['gstin'].value !== ''
      && !this.editSupplierForm.controls['supplierDetails']['controls']['gstin'].hasError('pattern')) {
      console.log('came in the if');
      this.editSupplierForm.controls['supplierDetails']['controls']['panNumber'].enable();
      this.editSupplierForm.controls['supplierDetails']['controls']['panNumber']
        .setValidators([Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]);
      this.editSupplierForm.controls['supplierDetails']['controls']['isComposite'].enable();
      // this.editSupplierForm.controls['supplierDetails']['controls']['isComposite'].setValidators([Validators.required]);
    } else {
      console.log('came in the else');
      this.editSupplierForm.controls['supplierDetails']['controls']['panNumber'].disable();
      this.editSupplierForm.controls['supplierDetails']['controls']['isComposite'].disable();
    }
  }

  getSupplierTypeList() {
    this._httpService.getSupplierTypes()
      .subscribe((result: any) => {
        if (result.success === true) {
          console.log(result.data[0]);
          this.supplierTypes = result.data;
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
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

  retailerDetails() {
    this.errMsg = false;
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
      let input = {
        id: this.id
      }
      this._httpService.supplier_details(input)
        .subscribe((result: any) => {
          if (result.success === true) {
            this.data = result.data;
            this.editSupplierForm.patchValue(this.data);
            console.log(this.data);
            this.onGstInit();
          }
        }, (err: any) => {
          this.errorHandle(err);
        }, () => console.log());
    })
  }

  onUpdateRetailer() {
    const data = this.editSupplierForm.value;
    console.log('this is the retailer', data);
    if (data.supplierDetails.isComposite === '') {
      data.supplierDetails.isComposite = null;
    }
    if (data.supplierDetails.gstin === '') {
      data.supplierDetails.panNumber = '';
      data.supplierDetails.isComposite = null;
    }
    if (data.policy.id === '') {
      delete data.policy.id;
    }
    if (data.policy.isTwoDay === '') {
      data.policy.isTwoDay = false;
    }
    if (data.policy.id === null) {
      delete data.policy.id;
    }
    data.mobileNumber = data.mobileNumber.toString();
    data.postalCode = data.supplierDetails.postalCode.toString();
    this._httpService.updateSupplier(data, this.id)
      .subscribe((result: any) => {
        if (result.success === true) {
          alertFunctions.typeCustom('Success!', 'Supplier updated!', 'success');
          this.data = result.data;
          this.editSupplierForm.reset();
          this._router.navigate(['/suppliers/details/' + result.data.id]);
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
