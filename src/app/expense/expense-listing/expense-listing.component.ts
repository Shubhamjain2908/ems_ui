import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as alertFunctions from './../../shared/data/sweet-alert'
import swal from 'sweetalert2';
import { ExpenseService } from 'app/services/expense.service';
import { noWhitespaceValidator } from 'app/utils/custom-validators';
import { CategoryService } from 'app/services/category.service';

@Component({
  selector: 'app-expense-listing',
  templateUrl: './expense-listing.component.html',
  styleUrls: ['./expense-listing.component.scss'],
  providers: [ExpenseService, CategoryService],
  encapsulation: ViewEncapsulation.None
})

export class ExpenseComponent implements OnInit {
  public data: any = [];
  noRecordErr = false;
  table_loader_class = 'table_loader';
  table_loader_class2 = '';

  disable_next = false;
  modalReference: NgbModalRef;
  closeResult: string;
  expense: any;
  selected = 'any';
  cId: any;

  page = 1;
  currentPage = 0;
  payload: Object = {
    page: 1
  };

  addExpenseForm = new FormGroup({
    parentId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, noWhitespaceValidator])
  });

  updateExpenseForm = new FormGroup({
    parentId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, noWhitespaceValidator])
  });

  constructor(private modalService: NgbModal,
    private _httpService: ExpenseService,
    private _router: Router) {
  }

  ngOnInit() {
    this.listing();
    this.getCatId();
  }

  listing() {
    this.table_loader_class = 'table_loader';
    this.data = [];
    this.noRecordErr = false;
    this._httpService.listing(this.payload)
      .subscribe((result: any) => {
        if (result.success === true) {
          this.table_loader_class = '';
          if (result.data.length > 0) {
            this.data = result.data;
          }
          if (result.data.length === 0 || result.data.length < 10) {
            if (result.data.length === 0) {
              this.noRecordErr = true;
            }
            this.disable_next = true;
          } else {
            this.disable_next = false;
          }
        }
      }, (err: any) => {
        this.table_loader_class = '';
        this.errorHandle(err);
      }, () => console.log());
  }

  change_page(page, type) {
    if (type === 1) {
      page++;
      this.currentPage = page;
      this.page = page;
    } else {
      page--;
      this.currentPage = page;
      this.page = page;
    }
    this.payload['page'] = this.page;
    this.listing();
  }

  onAddExpense() {
    const data = this.addExpenseForm.value;
    const b1 = this.data.some(obj => obj.parentId === +data.parentId);
    const b2 = this.data.some(obj => obj.name === data.name);
    if (b1 && b2) {
      alertFunctions.typeCustom('Error!', 'Subexpense already present!', 'warning');
    } else {
      this._httpService.add(data)
        .subscribe((result: any) => {
          if (result.success === true) {
            this.modalReference.close();
            alertFunctions.typeCustom('Great!', 'Subexpense added!', 'success');
            this.addExpenseForm.reset();
            this.listing();
          }
        }, (err: any) => {
          this.errorHandle(err);
        }, () => console.log());
    }
  }

  onUpdateExpense() {
    const data = this.updateExpenseForm.value;
    this._httpService.update(data, this.expense.id)
      .subscribe((result: any) => {
        if (result.success === true) {
          this.modalReference.close();
          alertFunctions.typeCustom('Great!', 'Subexpense updated!', 'success');
          this.listing();
          this.updateExpenseForm.reset();
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }

  openUpdExpense(content, expense) {
    this.selected = expense.parent.id;
    this.expense = expense;
    this.updateExpenseForm.controls['parentId'].setValue(this.selected);
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
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

  confirmTextExpense(data) {
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
        self.deleteExpense(data);
      }
    })
  }

  deleteExpense(data) {
    this._httpService.delete(data.id)
      .subscribe((result: any) => {
        alertFunctions.typeCustom('Great!', 'Sub-Expense Deleted!', 'success');
        this.data.splice(this.data.indexOf(data), 1);
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

  getCatId() {
    this._httpService.listing({ page: 1, limit: Number.MAX_SAFE_INTEGER })
      .subscribe((result: any) => {
        if (result.success === true) {
          if (result.data.length > 0) {
            this.cId = result.data;
          }
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }
}
