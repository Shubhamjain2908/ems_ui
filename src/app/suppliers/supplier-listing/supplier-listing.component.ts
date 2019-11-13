import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SuppliersService } from '../../services/suppliers.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import swal from 'sweetalert2';
import { noWhitespaceValidator } from 'app/utils/custom-validators';

@Component({
  selector: 'app-supplier-listing',
  templateUrl: './supplier-listing.component.html',
  styleUrls: ['./supplier-listing.component.scss'],
  providers: [SuppliersService, NgbPaginationConfig],
  encapsulation: ViewEncapsulation.None
})

export class SupplierListingComponent implements OnInit {
  public data: any = [];

  table_loader_class = 'table_loader';
  table_loader_class2 = '';

  modalReference: NgbModalRef;
  closeResult: string;

  category: any;
  noRecordErr = false;

  data_count = 0;
  page = 1;
  currentPage = 0;
  payload: Object = {
    page: 1,
    limit: 10
  };

  addCategoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required, noWhitespaceValidator]),
  });

  addSupplierForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    businessName: new FormControl('', [Validators.required]),
    supplierType: new FormControl('', [Validators.required]),
    dealsInCategory: new FormControl('', [Validators.required]),
    gstin: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]),
    // signature: new FormControl('', [Validators.required]),
    panNumber: new FormControl('', [Validators.required]),
    supplyProductType: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl(''),
    landmark: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required])
  });

  updateCategoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required, noWhitespaceValidator]),
  });

  filterForm = new FormGroup({
    name: new FormControl('')
  });


  constructor(private modalService: NgbModal,
    private _httpService: SuppliersService,
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

  listing() {
    this.noRecordErr = false;
    this.table_loader_class = 'table_loader';
    this.data = [];
    this._httpService.listing(this.payload)
      .subscribe((result: any) => {
        this.table_loader_class = '';
        if (result.success === true) {
          this.table_loader_class = '';
          if (result.data.suppliers.length > 0) {
            this.data = result.data;
            this.data_count = result.data.count
          } else {
            this.noRecordErr = true;
          }
        }
      }, (err: any) => {
        this.table_loader_class = '';
        this.errorHandle(err);
      }, () => console.log());
  }

  // change_page(page, type) {
  //   if (type === 1) {
  //     page++;
  //     this.currentPage = page;
  //     this.page = page;
  //   } else {
  //     page--;
  //     this.currentPage = page;
  //     this.page = page;
  //   }
  //   this.payload['page'] = this.page;
  //   this.listing();
  // }
  onAddSupplier() {
    const data = this.addSupplierForm.value;
    console.log('this is the supplier', data);
    data.mobileNumber = data.mobileNumber.toString();
    data.postalCode = data.postalCode.toString();
    console.log('this is the supplier', data);
    this._httpService.add(data)
      .subscribe((result: any) => {
        if (result.success === true) {
          console.log(result.data);
          this.modalReference.close();
          alertFunctions.typeCustom('Success!', 'Supplier added!', 'success');
          this.data.push(result.data);
          this.addCategoryForm.reset();
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }
  onAddCategory() {
    const data = this.addCategoryForm.value;
    console.log('this is the supplier', data);
    this._httpService.add(data)
      .subscribe((result: any) => {
        if (result.success === true) {
          this.modalReference.close();
          alertFunctions.typeCustom('Great!', 'Category added!', 'success');
          this.data.push(result.data);
          this.addCategoryForm.reset();
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }

  onUpdateCategory() {
    const data = this.updateCategoryForm.value;
    data.id = this.category.id;
    this._httpService.update([data])
      .subscribe((result: any) => {
        if (result.success === true) {
          this.modalReference.close();
          alertFunctions.typeCustom('Great!', 'Category updated!', 'success');
          this.data.find(v => v.id === this.category.id).categoryName = data.categoryName;
          this.updateCategoryForm.reset();
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }

  openUpdCategory(content, category) {
    this.category = category;
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.addCategoryForm.reset();
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // This function is used in open
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  confirmTextCategory(data) {
    const self = this;
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success btn-raised mr-5',
      cancelButtonClass: 'btn btn-danger btn-raised',
      buttonsStyling: false
    }).then(function (isConfirm) {
      if (typeof isConfirm.value !== 'undefined' && isConfirm.hasOwnProperty('value')) {
        self.deleteCategory(data);
      }
    })
  }

  deleteCategory(data) {
    this._httpService.delete(data.id)
      .subscribe((result: any) => {
        if (result.success === true) {
          alertFunctions.typeCustom('Great!', 'Category Deleted!', 'success');
          this.data.splice(this.data.suppliers.indexOf(data), 1);
          this.data.map(p => {
            if (p.order > data.order) {
              p.order -= 1;
            }
          });
        }
      }, (err: any) => {
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

}
