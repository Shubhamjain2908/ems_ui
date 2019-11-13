import { Component, OnInit } from '@angular/core';
import { SuppliersService } from 'app/services/suppliers.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as fromRoot from './../../reducers';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { TagActions } from 'app/shared/actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
  providers: [SuppliersService]
})
export class AddSupplierComponent implements OnInit {

  public data: any = [];
  public supplierTypes: any = [];
  public categories: any = [];
  table_loader_class = 'table_loader';
  table_loader_class2 = '';
  tags$: Observable<any>;

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

  addSupplierForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}/)]),
    password: new FormControl('', [Validators.required]),
    oneops_margin: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(1)]),
    shiprocket_margin: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(1)]),
    tags: new FormControl([], []),
    policy: new FormGroup({
      policy: new FormControl(''),
      isTwoDay: new FormControl('')
    }),
    supplierDetails: new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      supplierTypes: new FormControl([], [Validators.required]),
      dealsIn: new FormControl('', [Validators.required]),
      gstin: new FormControl('', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]),
      // signature: new FormControl('', [Validators.required]),
      panNumber: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]),
      isComposite: new FormControl({ value: '', disabled: true }),
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
    private store: Store<any>
  ) {
    this.tags$ = this.store.pipe(select(fromRoot.getAllTags));
  }

  ngOnInit() {
    this.getSupplierTypeList();
    this.getCategoriesList();
    console.log(this.supplierTypes);
    this.onGstInit();
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

  searchTags(event) {
    this.store.dispatch(new TagActions.GetTagList({ search: event.query }));
  }

  onGstInit() {
    console.log(this.addSupplierForm.controls['supplierDetails']['controls']['gstin'].value !== '');
    if (this.addSupplierForm.controls['supplierDetails']['controls']
    ['gstin'].value !== '' && !this.addSupplierForm.controls['supplierDetails']['controls']['gstin'].hasError('pattern')) {
      console.log('came in the if');
      this.addSupplierForm.controls['supplierDetails']['controls']['panNumber'].enable();
      this.addSupplierForm.controls['supplierDetails']['controls']['panNumber'].setValidators([Validators.required]);
      this.addSupplierForm.controls['supplierDetails']['controls']['isComposite'].enable();
      this.addSupplierForm.controls['supplierDetails']['controls']['isComposite'].setValidators([Validators.required]);
    } else {
      console.log('came in the else');
      this.addSupplierForm.controls['supplierDetails']['controls']['panNumber'].disable();
      this.addSupplierForm.controls['supplierDetails']['controls']['isComposite'].disable();
    }
  }
  onGstKeyUp(event: any) {
    console.log(event.target.value);
    console.log(this.addSupplierForm.controls['supplierDetails']['controls']['gstin'].hasError('pattern'))
    if (this.addSupplierForm.controls['supplierDetails']['controls']
    ['gstin'].value !== '' && !this.addSupplierForm.controls['supplierDetails']['controls']['gstin'].hasError('pattern')) {
      console.log('came in the if');
      this.addSupplierForm.controls['supplierDetails']['controls']['panNumber'].enable();
      this.addSupplierForm.controls['supplierDetails']['controls']['isComposite'].enable();
    } else {
      console.log('came in the else');
      this.addSupplierForm.controls['supplierDetails']['controls']['panNumber'].disable();
      this.addSupplierForm.controls['supplierDetails']['controls']['isComposite'].disable();
    }
  }
  onAddSupplier() {
    const data = this.addSupplierForm.value;
    console.log('this is the supplier', data);
    if (data.supplierDetails.isComposite === '') {
      if (data.supplierDetails.gstin === '') {
        data.supplierDetails.isComposite = null;
      } else {
        data.supplierDetails.isComposite = false;
      }
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
    data.supplierDetails.postalCode = data.supplierDetails.postalCode.toString();
    console.log('this is the supplier', data);
    this._httpService.add(data)
      .subscribe((result: any) => {
        if (result.success === true) {
          console.log(result.data);
          alertFunctions.typeCustom('Success!', 'Supplier added!', 'success');
          this.data.push(result.data);
          this.addSupplierForm.reset();
          this._router.navigate(['/suppliers']);
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
