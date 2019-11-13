import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { SuppliersService } from 'app/services/suppliers.service';
import { noWhitespaceValidator } from 'app/utils/custom-validators';

declare var $;
@Component({
  selector: 'app-user-detail-listing',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss'],
  providers: [SuppliersService],
  encapsulation: ViewEncapsulation.None
})

export class SupplierDetailsComponent implements OnInit {
  public data: any;
  id: any;
  imageData: any;
  refer_by: any = {};
  currentPage = 'About';
  modalReference: NgbModalRef;
  closeResult: string;
  team_turnover: any;
  team_turnover_amount = 0;
  public req_history_data: any = [];
  public tnx_history_data: any = [];
  showSpecialNotAvailable = false;
  table_loader_class = 'table_loader';
  disable_next = false;

  page = 1;
  public payload = {
    page: 1
  };
  // currentPage = 0;
  satusMap = new Map();
  userData: any;
  form_loader = false;

  file: any;
  video: any;
  videoId: any;

  certificate_file: any;
  liecence_file: any;
  image_file: any;
  profile_file: any;
  imageId: any;

  keywordData: any;
  pmKeywordId: any;

  catData: any;
  catId: any;
  pmId: any;
  aadhar_file: any;
  pmData: any;

  subCatData: any;
  subCatId: any;

  errMsg: boolean;
  keyUp = false;

  walletData: any = {};

  k: any;
  s: any;

  module_selected: any = [];
  membership_Data: any;
  membership_value: any;

  userId: any;

  space = / /g;
  underscore = /_/g;

  specialist_keyword_id;

  public module_name = [{ 'name': 'Personal Information', 'id': 1 }, { 'name': 'Opportunity Type', 'id': 2 },
  { 'name': 'Industry', 'id': 3 }, { 'name': 'Keyword', 'id': 4 },
  { 'name': 'Area', 'id': 5 }, { 'name': 'Offer', 'id': 6 },
  { 'name': 'About', 'id': 7 }, { 'name': 'Backgroud Verification', 'id': 8 }, { 'name': 'Self Declaration', 'id': 9 }
  ];

  updateUserForm = new FormGroup({
    name: new FormControl('', [Validators.required, noWhitespaceValidator]),
    email: new FormControl('', [Validators.email, Validators.required]),
    dob: new FormControl('')
  });

  // updatePMForm = new FormGroup({
  //   about: new FormControl('', [Validators.required]),
  //   also_intrested: new FormControl('', [Validators.required]),
  //   communication_address: new FormControl('', [Validators.required]),
  //   membership_type: new FormControl('', [Validators.required]),
  //   offer: new FormControl('', [Validators.required]),
  //   offer_expiry_date: new FormControl('', [Validators.required]),
  //   pincode: new FormControl('', [Validators.required]),
  //   categoryId: new FormControl(this.catId, [Validators.required])
  // });

  updateKeywordForm = new FormGroup({
    keywordId: new FormControl('', [Validators.required])
  });

  addKeywordForm = new FormGroup({
    keywordId: new FormControl('', [Validators.required])
  });

  updateSubcategoryForm = new FormGroup({
    subCategoryId: new FormControl('', [Validators.required])
  });

  addSubcategoryForm = new FormGroup({
    subCategoryId: new FormControl('', [Validators.required])
  });


  addForm = new FormGroup({
    reason: new FormControl('', [Validators.required, noWhitespaceValidator]),
    transactionId: new FormControl(''),
    membership_type: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
  });

  constructor(private route: ActivatedRoute,
    private _httpService: SuppliersService,
    private _router: Router, ) {
  }

  ngOnInit() {
    $.getScript('./assets/js/vertical-timeline.js');

    this.supplierDetails();

    // setTimeout(() => {
    //   this.getSubCategorys();
    // }, 3000);
  }

  // Formatter
  formatter = (result: string) => result.toUpperCase();
  formatter1 = (x: { keyword: string }) => x.keyword;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.keywordData.filter(v => v.keyword.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));


  showPage(page: string) {
    this.currentPage = page;
    this.page = 1;
  }

  change_page(page, type) {
    if (type === 1) {
      page++;
      this.page = page;
    } else {
      page--;
      this.page = page;
    }
    this.payload['page'] = this.page;
  }


  supplierDetails() {
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
          }
        }, (err: any) => {
          this.errorHandle(err);
        }, () => console.log());
    })
  }
  errorHandle(err) {
    // this.displayMessageError = true;
    if (err.status === 0) {
      // this.message = 'Please check your internet connection';
      return;
    } else if (err.status === 500) {
      // this.message = 'Server error';
    } else if (err.status === 422) {
      // this.message = 'some validation error';
    } else if (err.status === 401) {
      this._router.navigate(['/logout']);
    }
    // this.message = JSON.parse(err._body).message;
  }
}
