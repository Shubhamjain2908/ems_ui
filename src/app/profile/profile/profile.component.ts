import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as alertFunctions from './../../shared/data/sweet-alert'
import { noWhitespaceValidator } from 'app/utils/custom-validators';
import { CategoryService } from 'app/services/category.service';
import { AuthService } from 'app/services/auth.service';
import { BudgetService } from 'app/services/budget.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-listing',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [BudgetService, CategoryService],
  encapsulation: ViewEncapsulation.None
})

export class ProfileComponent implements OnInit {

  public data: any = [];
  user: any;
  public budgetData: any = {};
  page = 1;
  modalReference: NgbModalRef;
  closeResult: string;

  updateUserForm = new FormGroup({
    mobile: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.minLength(7), Validators.maxLength(10)]),
    address: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.maxLength(30)]),
    name: new FormControl('', [Validators.required, noWhitespaceValidator]),
  });

  constructor(private _httpService: AuthService,
    private _router: Router,
    private budgetService: BudgetService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.listing();
    this.getBudget();
  }

  listing() {
    this.data = [];
    this._httpService.getUser()
      .subscribe((result: any) => {
        if (result.success === true) {
          this.data = result.data;
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }

  // onAddExpense() {
  //   const data = this.addExpenseForm.value;
  //   const b1 = this.data.some(obj => obj.parentId === +data.parentId);
  //   const b2 = this.data.some(obj => obj.name === data.name);
  //   if (b1 && b2) {
  //     alertFunctions.typeCustom('Error!', 'Subexpense already present!', 'warning');
  //   } else {
  //     this._httpService.add(data)
  //       .subscribe((result: any) => {
  //         if (result.success === true) {
  //           this.modalReference.close();
  //           alertFunctions.typeCustom('Great!', 'Subexpense added!', 'success');
  //           this.addExpenseForm.reset();
  //           this.listing();
  //         }
  //       }, (err: any) => {
  //         this.errorHandle(err);
  //       }, () => console.log());
  //   }
  // }

  updateUser() {
    const data = this.updateUserForm.value;
    this._httpService.updateUser(data)
      .subscribe((result: any) => {
        if (result.success === true) {
          this.modalReference.close();
          alertFunctions.typeCustom('Great!', 'User updated!', 'success');
          this.updateUserForm.reset();
          this.data.mobile = data.mobile;
          this.data.address = data.address;
          this.data.name = data.name;
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }

  open(content) {
    this.updateUserForm.controls['mobile'].setValue(this.data.mobile);
    this.updateUserForm.controls['address'].setValue(this.data.address);
    this.updateUserForm.controls['name'].setValue(this.data.name);
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

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

  getBudget() {
    this.budgetData = {};
    this.budgetService.listing({}).subscribe((result: any) => {
      if (result.success === true) {
        this.budgetData = result.data;
      }
    }, (err: any) => {
      this.errorHandle(err);
    }, () => console.log());
  }

  addBudget(budget) {
    this.budgetService.add({ budget: budget }).subscribe((result: any) => {
      if (result.success === true) {
        this.budgetData = result.data;
        alertFunctions.typeCustom('Success!', 'Budget updated successfully', 'success');
      }
    }, (err: any) => {
      this.errorHandle(err);
    }, () => console.log());
  }

}
