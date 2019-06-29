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
  subId: any;

  page = 1;
  currentPage = 0;
  payload: Object = {
    page: 1
  };

  addExpenseForm = new FormGroup({
    parentId: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    expense: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.pattern('^[0-9]*$')])
  });

  updateExpenseForm = new FormGroup({
    parentId: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    expense: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.pattern('^[0-9]*$')])
  });

  constructor(private modalService: NgbModal,
    private _httpService: ExpenseService,
    private catService: CategoryService,
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
    this._httpService.add(data)
      .subscribe((result: any) => {
        if (result.success === true) {
          this.modalReference.close();
          alertFunctions.typeCustom('Great!', 'Expense added!', 'success');
          this.addExpenseForm.reset();
          this.listing();
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }


  onUpdateExpense() {
    const data = this.updateExpenseForm.value;
    delete data.parentId;
    this._httpService.update(data, this.expense.id)
      .subscribe((result: any) => {
        if (result.success === true) {
          this.modalReference.close();
          alertFunctions.typeCustom('Great!', 'Expense updated!', 'success');
          this.listing();
          this.updateExpenseForm.reset();
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }

  openUpdExpense(content, expense) {
    this.getSubCatId(expense.category.parentId);
    this.expense = expense;
    this.updateExpenseForm.controls['parentId'].setValue(expense.category.parentId);
    this.updateExpenseForm.controls['categoryId'].setValue(expense.categoryId);
    this.updateExpenseForm.controls['expense'].setValue(expense.expense);
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
        alertFunctions.typeCustom('Great!', 'Expense Deleted!', 'success');
        this.data.map(a => {
          if (+a.id === +data.id) {
            a.isDeleted = true;
          }
        });
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
    } else if (err.status === 406) {
      alertFunctions.typeCustom('Not Allowed!', err.error.message, 'error');
    } else if (err.status === 401) {
      this._router.navigate(['/logout']);
    }
    // this.message = JSON.parse(err._body).message;
  }

  getCatId() {
    this.cId = [];
    this.catService.listing({ page: 1, limit: Number.MAX_SAFE_INTEGER })
      .subscribe((result: any) => {
        if (result.success === true) {
          this.cId = result.data;
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }

  getSubCatId(id) {
    this.subId = [];
    this.catService.getOneCategory(id)
      .subscribe((result: any) => {
        if (result.success === true) {
          this.subId = result.data;
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }
}
