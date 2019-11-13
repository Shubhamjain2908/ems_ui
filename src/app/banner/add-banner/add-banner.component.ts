import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AWSService } from 'app/services/aws.service';
import { Store } from '@ngrx/store';
import * as fromBannerState from './../reducers';
import * as fromBannerOptionsState from './../reducers';
import * as fromRootState from './../../reducers';
import { ActivatedRoute } from '@angular/router';
// import { CategoryActions } from 'app/category/actions';
import { OptionsActions } from 'app/banner/actions';
import { BannerActions } from '../actions';
import { markFormGroupTouched } from 'app/utils/form.utils';
import { CategoryActions } from 'app/shared/actions';
import { noWhitespaceValidator } from 'app/utils/custom-validators';
@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent implements OnInit {
  form: FormGroup;
  showDropdown = false;
  bannerId: any;
  banner$: any;
  options$: any;
  categories$: any;
  image: any;

  constructor(private formBuilder: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute, private awsService: AWSService) {
    this.store.dispatch(new BannerActions.EmptyState());
    this.store.dispatch(new OptionsActions.GetCategoryList({ level: 0, eager: 'children', limit: 2345687890 }));
    this.store.dispatch(new CategoryActions.GetCategoryList({ level: 0, limit: 2345687890 }));
    if (this.route.snapshot.paramMap.get('id')) {
      this.bannerId = this.route.snapshot.paramMap.get('id');
      console.log(this.bannerId);
      this.store.dispatch(new BannerActions.GetBanner(this.bannerId, { eager: 'category' }))
    }
    this.categories$ = this.store.select(fromRootState.getCategoryOptions);
    this.banner$ = this.store.select(fromBannerState.getBanner);
    this.options$ = this.store.select(fromBannerOptionsState.getBannerOptions);
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), noWhitespaceValidator]),
      entityType: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      entityId: new FormControl(''),
      imageUrl: new FormControl('', [Validators.required])
    });
    this.banner$.subscribe({
      next: banner => {
        if (banner) {
          this.form.patchValue(banner);
          this.image = banner.imageUrl;
        }
      }
    });
    this.form.controls['categoryId'].valueChanges.subscribe({
      next: value => {
        const entityValue = this.form.controls['entityType'].value;
        console.log('this is the value', entityValue);
        if (entityValue === 'category') {
          this.form.controls['entityId'].reset();
          this.form.controls['entityType'].reset();
          this.showDropdown = true;
          this.form.controls['entityId'].disable();
          this.store.dispatch(new OptionsActions.GetCategoryList({ level: 0, limit: 2345687890 }));
        } else if (entityValue === 'subcategory') {
          this.form.controls['entityId'].reset();
          this.form.controls['entityType'].reset();
          this.showDropdown = true;
          const parentId = value;
          this.form.controls['entityId'].setValidators([Validators.required]);
          this.form.controls['entityId'].enable();
          this.store.dispatch(new OptionsActions.GetCategoryList({ level: 1, parentId: parentId, limit: 2345687890 }));
        } else if (entityValue === 'subsubcategory') {
          this.form.controls['entityId'].reset();
          this.form.controls['entityType'].reset();
          this.showDropdown = true;
          this.form.controls['entityId'].setValidators([Validators.required]);
          this.form.controls['entityId'].enable();
          this.store.dispatch(new OptionsActions.GetCategoryList({ level: 2, load_subsubcategory: 1, limit: 2345687890 }));
        } else {
          this.form.controls['entityId'].reset();
          this.showDropdown = true;
          this.store.dispatch(new OptionsActions.EmptyState());
        }
      }
    })
    this.form.controls['entityType'].valueChanges.subscribe({
      next: value => {
        console.log('this is the value', value);
        const parentId = this.form.controls['categoryId'].value;
        if (value === 'category') {
          this.form.controls['entityId'].reset();
          this.showDropdown = true;
          this.form.controls['entityId'].disable();
          this.store.dispatch(new OptionsActions.GetCategoryList({ level: 0, limit: 2345687890 }));
        } else if (value === 'subcategory') {
          this.form.controls['entityId'].reset();
          this.showDropdown = true;
          this.form.controls['entityId'].setValidators([Validators.required]);
          this.form.controls['entityId'].enable();
          this.store.dispatch(new OptionsActions.GetCategoryList({ level: 1, parentId: parentId, limit: 2345687890 }));
        } else if (value === 'subsubcategory') {
          this.form.controls['entityId'].reset();
          this.showDropdown = true;
          this.form.controls['entityId'].setValidators([Validators.required]);
          this.form.controls['entityId'].enable();
          this.store.dispatch(new OptionsActions.GetCategoryList({
            level: 2,
            load_subsubcategory: 1, parentId: parentId, limit: 2345687890
          }));
        } else {
          this.form.controls['entityId'].reset();
          this.showDropdown = true;
          this.store.dispatch(new OptionsActions.EmptyState());
        }
      }
    })
  }
  onSubmit() {
    console.log('this is the form', this.form.value);
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }
    const data = this.form.value;
    delete data.type;
    if (data.entityType === 'category') {
      data.entityId = data.categoryId;
    }
    if (this.bannerId) {
      this.store.dispatch(new BannerActions.UpdateBanner(this.bannerId, data))
    } else {
      this.store.dispatch(new BannerActions.CreateBanner(data))
    }
  }

  selectFile(event: any) {
    this.awsService.uploadFile(event.target.files[0]).subscribe((result: any) => {
      this.form.patchValue({ imageUrl: result.image.url });
    }, err => {
      console.log(err);
    });
  }
}
