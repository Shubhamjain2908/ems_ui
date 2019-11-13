import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AWSService } from 'app/services/aws.service';
import { CouponActions } from '../actions';
import { noWhitespaceValidator, percentageValidator, datesValidator } from 'app/utils/custom-validators';
import { markFormGroupTouched } from 'app/utils/form.utils';
import { ProductActions } from 'app/product/actions';
import { CollectionActions } from 'app/collection/actions';
import * as fromStore from './../reducers';
import * as fromRoot from './../../reducers';
import { CategoryActions } from 'app/shared/actions';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {

  couponId: any;

  form: FormGroup;
  filterForm: FormGroup;

  coupon$: Observable<any>;
  products$: Observable<any>;
  collections$: Observable<any>;
  codeSuggestion$: Observable<any>;
  categories$: Observable<any>;

  showDropdown = false;
  query: any = '';
  today = new Date();

  businessType = [
    { label: 'All', value: 'all' },
    { label: 'B2B', value: 'b2b' },
    { label: 'B2C', value: 'b2c' },
    { label: 'Customer', value: 'customer' }
  ]

  userType = [
    { label: 'All', value: 'all' },
    { label: 'First time user', value: 'first_time_user' },
    { label: 'Specific customers', value: 'specific_customer' },
    { label: 'Specific Group', value: 'specific_group' }
  ]

  productCondition = [
    { label: 'All', value: 'all' },
    { label: 'Exclude collections', value: 'exclude_collection' },
    { label: 'Exclude Categories', value: 'exclude_categories' },
    { label: 'Selected Collections', value: 'selected_collections' },
    { label: 'Selected Products', value: 'selected_products' }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute,
    private awsService: AWSService) {
    this.store.dispatch(new CouponActions.EmptyState());
    if (this.route.snapshot.paramMap.get('id')) {
      this.couponId = this.route.snapshot.paramMap.get('id')
      this.store.dispatch(new CouponActions.GetCoupon(this.couponId, {
        eager: '[products, exclude_categories, collections, exclude_collections]'
      }))
    } else {
      this.store.dispatch(new CouponActions.GetCouponCodeSuggestion());
    }
    this.store.dispatch(new CategoryActions.EmptyState());
    this.store.dispatch(new CategoryActions.GetCategoryList({ level: 0, eager: 'children.^', limit: 2345687890 }))
    this.categories$ = this.store.pipe(select(fromRoot.getAllCategories));
    this.coupon$ = this.store.select(fromStore.getCoupon);
    this.products$ = this.store.pipe(select(fromStore.getAllProducts));
    this.collections$ = this.store.pipe(select(fromStore.getAllCollections));
    this.codeSuggestion$ = this.store.pipe(select(fromStore.getCodeSuggestion));
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, noWhitespaceValidator]),
      code: new FormControl('', [Validators.required, noWhitespaceValidator]),
      products: new FormControl([], []),
      collections: new FormControl([], []),
      exclude_collections: new FormControl([], []),
      exclude_categories: new FormControl([], []),
      type: new FormControl('fixed', [Validators.required]),
      business_type: new FormControl('all', [Validators.required]),
      user_type: new FormControl('all', [Validators.required]),
      product_condition: new FormControl('all', [Validators.required]),
      value: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(0.01)]),
      min_order_value: new FormControl(0, [Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(0)]),
      max_discount_value: new FormControl(null, [Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(0.01)]),
      start_date: new FormControl(new Date(), []),
      end_date: new FormControl('', [])
    });
    this.form.setValidators([percentageValidator(), datesValidator('start_date', 'end_date')]);
    this.coupon$.subscribe({
      next: coupon => {
        if (coupon) {
          this.form.patchValue({
            ...coupon,
            start_date: coupon.start_date ? new Date(coupon.start_date) : null,
            end_date: coupon.end_date ? new Date(coupon.end_date) : null,
          });
        }
      }
    });
    this.codeSuggestion$.subscribe({
      next: code => {
        if (code) {
          this.form.patchValue({
            code
          });
        }
      }
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      console.log('invalid')
      return;
    }
    const data = this.form.value;
    // delete data.type;
    if (this.couponId) {
      this.store.dispatch(new CouponActions.UpdateCoupon(this.couponId, data))
    } else {
      this.store.dispatch(new CouponActions.CreateCoupon(data))
    }
  }

  // selectFile(event: any) {
  //   this.awsService.uploadFile(event.target.files[0]).subscribe((result: any) => {
  //     this.form.patchValue({ imageUrl: result.image.url });
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  search(event: any) {
    this.query = event.query;
    this.store.dispatch(new ProductActions.GetProductList({ search: this.query, limit: 234567890 }))
  }

  searchCollection(event: any) {
    this.query = event.query;
    this.store.dispatch(new CollectionActions.GetCollectionList({ search: this.query, limit: 234567890 }))
  }

}
