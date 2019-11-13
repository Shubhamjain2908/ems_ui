import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ProductActions } from '../actions';
import * as fromStore from './../reducers';
import * as fromRoot from './../../reducers';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderActions, CategoryActions } from 'app/shared/actions';
import { skip, tap } from 'rxjs/operators';
import { UserActions } from 'app/retailer-service/actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<any>;
  loading$: Observable<boolean>;
  nextPage$: Observable<boolean>;
  categories$: Observable<any>;
  limit = 10;
  offset = 0;
  page = 1;
  noImages = true;
  isPublished = false;
  imagesError = false;
  form: FormGroup;
  supplierId: any;
  users$: Observable<any[]>;
  publisedOptions = [
    { label: 'Published', value: 1 },
    { label: 'Unpublished', value: 0 }
  ]
  category: any;

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.supplierId = this.route.snapshot.paramMap.get('supplierId');
    this.store.dispatch(new ProductActions.GetProductList({ user_id: this.supplierId, order: 'created_at DESC', eager: 'images' }));
    this.store.dispatch(new UserActions.GetUserList({ limit: 234567890, userTypeId: 2, isActive: 1, isAdminVerified: 1 }));
    this.users$ = this.store.pipe(select(fromStore.getAllUsers));
    this.store.dispatch(new CategoryActions.GetCategoryList({ level: 0, eager: 'children.^', limit: 2345687890 }))
    this.categories$ = this.store.pipe(select(fromRoot.getAllCategories));
    this.products$ = this.store.pipe(select(fromStore.getAllProducts));
    this.loading$ = this.store.select(fromRoot.getLoadingStatus);
    this.nextPage$ = this.store.select(fromRoot.pageDisabled);
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      skip(1),
      tap(x => this.store.dispatch(new LoaderActions.SetLoadingTrue()))
    ).subscribe({
      next: x => {
        this.store.dispatch(new ProductActions.GetProductList(x));
      }
    });

    this.form = this.formBuilder.group({
      is_published: new FormControl(undefined, []),
      search: new FormControl('', []),
      order: new FormControl('created_at DESC', []),
      categoryId: new FormControl('', []),
      userType: new FormControl(null, []),
      userId: new FormControl(null, []),
      user_id: new FormControl(null, []),
    })
    this.form.controls['userType'].valueChanges.subscribe({
      next: value => {
        if (value === 2) {
          this.form.controls['user_id'].reset();
          this.store.dispatch(new UserActions.GetUserList({ limit: 234567890, userTypeId: 2, isActive: 1, isAdminVerified: 1 }));
        } else if (value === 3) {
          this.form.controls['user_id'].reset();
          this.store.dispatch(new UserActions.GetUserList({ limit: 234567890, userTypeId: 3, isActive: 1, isAdminVerified: 1 }))
        }
      }
    });
    this.form.valueChanges.subscribe({
      next: x => {
        this.limit = 10;
        this.offset = 0;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            limit: this.limit,
            offset: this.offset,
            eager: 'images',
            ...x
          },
          queryParamsHandling: 'merge',
          skipLocationChange: true
        });
      }
    })

    // this.products$.subscribe({
    //   next: value => {
    //     if (!value) {
    //       return;
    //     }
    //     console.log('-------', value);
    //     if (value.length > 0) {
    //       this.isPublished = value.is_published;
    //       if (value.images.length) {
    //         this.noImages = false
    //       }
    //       if (!value.images.length && value.product_variant.length) {
    //         this.noImages = value.product_variant.findIndex(pv => pv.images.length > 0) === -1
    //       }
    //     }
    //   }
    // })
  }

  change_page(page) {
    console.log(this.route);
    this.page = page > 0 ? page : 1;
    this.offset = 0 + this.limit * (this.page - 1);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        limit: this.limit,
        offset: this.offset,
        eager: 'images'
      },
      queryParamsHandling: 'merge',
      skipLocationChange: true
    });
  }

  onChangeCatgory(value) {
    this.form.controls['categoryId'].setValue(value.map(c => c.id));
  }

  onChangeUser(value) {
    console.log(value);
    if (!value.value) {
      this.form.controls['user_id'].setValue(null);
    } else {
      this.form.controls['user_id'].setValue(value.value.id);
    }
  }

  togglePublishStatus(event, product) {
    if (event.checked) {
      this.isPublished = true;
    } else {
      this.isPublished = false;
    }
    if (product.images.length === 0) {
      this.isPublished = false;
      return;
    }
    console.log(product);
    this.store.dispatch(new ProductActions.PatchProduct(product.id, { is_published: this.isPublished }));
  }

  setImagesError(images) {
    if (images.length === 0) {
      this.imagesError = true
    }
  }
}
