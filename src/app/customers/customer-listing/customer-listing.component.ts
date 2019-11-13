import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import swal from 'sweetalert2';
import { noWhitespaceValidator } from 'app/utils/custom-validators';


@Component({
  selector: 'app-supplier-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.scss'],
  providers: [CustomersService],
  encapsulation: ViewEncapsulation.None
})

export class CustomerListingComponent implements OnInit {
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

  addCategoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required, noWhitespaceValidator]),
  });

  addCustomerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required]),
  });

  updateCategoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required, noWhitespaceValidator]),
  });

  filterForm = new FormGroup({
    name: new FormControl('')
  });


  constructor(private modalService: NgbModal,
    private _httpService: CustomersService,
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
          if (result.data.customers.length > 0) {
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
  onAddCustomer() {
    const data = this.addCustomerForm.value;
    console.log('this is the customer', data);
    this._httpService.add(data)
      .subscribe((result: any) => {
        if (result.success === true) {
          this.modalReference.close();
          alertFunctions.typeCustom('Success!', 'Customer added!', 'success');
          this.data.push(result.data);
          this.addCategoryForm.reset();
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
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
              alertFunctions.typeCustom('Customer!', 'Blocked Successfully!', 'info');
              const index = this.data.customers.indexOf(key);
              this.data.customers[index].isActive = status;
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
              alertFunctions.typeCustom('Customer!', 'Activated Successfully!', 'success');
              const index = this.data.customers.indexOf(key);
              this.data.customers[index].isActive = status;
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
              alertFunctions.typeCustom('Customer!', 'Verified Successfully!', 'success');
              const index = this.data.customers.indexOf(key);
              this.data.customers[index].isAdminVerified = !status;
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
              const index = this.data.customers.indexOf(key);
              this.data.customers[index].isActive = status;
            }
          },
          (err) => {
            this.errorHandle(err);
          }, () => console.log()
        );
    }
  }

}
