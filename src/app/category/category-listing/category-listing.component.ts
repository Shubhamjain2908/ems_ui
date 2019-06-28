import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as alertFunctions from './../../shared/data/sweet-alert'
import swal from 'sweetalert2';
import { noWhitespaceValidator } from 'app/utils/custom-validators';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.scss'],
  providers: [CategoryService],
  encapsulation: ViewEncapsulation.None
})

export class CategoryComponent implements OnInit {
  public data: any = [];
  noRecordErr = false;
  table_loader_class = 'table_loader';
  table_loader_class2 = '';

  disable_next = false;
  modalReference: NgbModalRef;
  closeResult: string;
  category: any;

  page = 1;
  currentPage = 0;
  payload: Object = {
    page: 1
  };

  addCategoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, noWhitespaceValidator])
  });

  updateCategoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, noWhitespaceValidator])
  });

  constructor(private modalService: NgbModal,
    private _httpService: CategoryService,
    private _router: Router) {
  }

  ngOnInit() {
    this.listing();
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

  onAddCategory() {
    const data = this.addCategoryForm.value;
    const b = this.data.some(obj => obj.name === data.name);
    if (b) {
      alertFunctions.typeCustom('Error!', 'Category already present!', 'warning');
    } else {
      this._httpService.add(data)
        .subscribe((result: any) => {
          if (result.success === true) {
            this.modalReference.close();
            alertFunctions.typeCustom('Great!', 'Category added!', 'success');
            data.created_at = new Date();
            this.data.unshift(data);
            this.addCategoryForm.reset();
          }
        }, (err: any) => {
          this.errorHandle(err);
        }, () => console.log());
    }
  }

  onUpdateCategory() {
    const data = this.updateCategoryForm.value;
    this._httpService.update(data, this.category.id)
      .subscribe((result: any) => {
        if (result.success === true) {
          this.modalReference.close();
          alertFunctions.typeCustom('Great!', 'Category updated!', 'success');
          this.data = this.data.map((a) => {
            if (+a.id === +this.category.id) {
              a.name = data.name;
            }
            return a;
          });
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
          this.data.splice(this.data.indexOf(data), 1);
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
}
