import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AWSService } from 'app/services/aws.service';
import { noWhitespaceValidator } from 'app/utils/custom-validators';
import { markFormGroupTouched } from 'app/utils/form.utils';
import * as fromStore from './../reducers';
import * as fromRoot from './../../reducers';
import { CollectionActions, UserActions } from '../actions';
import { ProductActions } from 'app/product/actions';
import { CategoryActions } from 'app/shared/actions';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.scss']
})
export class AddCollectionComponent implements OnInit {

  collectionId: any;
  form: FormGroup;
  filterForm: FormGroup;
  categories$: Observable<any>;
  collection$: Observable<any>;
  products$: Observable<any>;
  users$: Observable<any>;
  showDropdown = false;
  query: any = '';
  image: any;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute,
    private awsService: AWSService) {
    this.store.dispatch(new CollectionActions.EmptyState());
    if (this.route.snapshot.paramMap.get('id')) {
      this.collectionId = this.route.snapshot.paramMap.get('id')
      this.store.dispatch(new CollectionActions.GetCollection(this.collectionId, { eager: '[category,products]' }))
    }
    this.store.dispatch(new UserActions.GetUserList({ limit: 234567890, userTypeId: 2, isActive: 1, isAdminVerified: 1 }))
    this.collection$ = this.store.select(fromStore.getCollection);
    this.products$ = this.store.pipe(select(fromStore.getAllProducts));
    this.categories$ = this.store.pipe(select(fromRoot.getAllCategories));
    this.users$ = this.store.pipe(select(fromStore.getAllUsers));
    this.store.dispatch(new CategoryActions.GetCategoryList({ eager: '', limit: 234567890, level: 0 }))
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, noWhitespaceValidator]),
      imageUrl: new FormControl('', [Validators.required]),
      category: new FormControl(undefined, [Validators.required]),
      products: new FormControl('', [])
    });
    this.filterForm = this.formBuilder.group({
      user: new FormControl('', []),
      user_id: new FormControl(undefined, []),
      topCategoryId: new FormControl(),
    })
    this.collection$.subscribe({
      next: collection => {
        if (collection) {
          this.form.patchValue(collection);
          this.image = collection.imageUrl;
        }
      }
    });
    this.form.controls['category'].valueChanges.subscribe({
      next: value => {
        if (typeof value === 'object') {
          this.form.controls['products'].reset();
          this.filterForm.controls['topCategoryId'].setValue(value.id)
        }
      }
    })
    this.filterForm.controls['user'].valueChanges.subscribe({
      next: value => {
        if (typeof value === 'object') {
          this.filterForm.controls['user_id'].setValue(value.id)
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
    delete data.type;
    if (this.collectionId) {
      this.store.dispatch(new CollectionActions.UpdateCollection(this.collectionId, data))
    } else {
      this.store.dispatch(new CollectionActions.CreateCollection(data))
    }
  }

  selectFile(event: any) {
    this.awsService.uploadFile(event.target.files[0]).subscribe((result: any) => {
      this.form.patchValue({ imageUrl: result.image.url });
    }, err => {
      console.log(err);
    });
  }

  search(event: any) {
    this.query = event.query;
    const filters = this.filterForm.value;
    delete filters.category;
    delete filters.user;
    this.store.dispatch(new ProductActions.GetProductList({ search: this.query, limit: 234567890, ...filters }))
  }

}
