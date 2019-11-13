import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import * as fromCategoryState from './../../reducers';
import { noWhitespaceValidator, parentIdValidator } from 'app/utils/custom-validators';
import { Observable } from 'rxjs';
import { markFormGroupTouched } from 'app/utils/form.utils';
import { AWSService } from 'app/services/aws.service';
import { CategoryActions } from 'app/shared/actions';
import * as alertFunctions from '../../shared/data/sweet-alerts';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryId: any;
  form: FormGroup;
  category$: Observable<any>;
  categories$: Observable<any[]>;
  showDropdown = false;
  image: any;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute,
    private awsService: AWSService) {
    this.store.dispatch(new CategoryActions.EmptyState());
    this.store.dispatch(new CategoryActions.GetCategoryList({ level: 0, eager: 'children', limit: 2345687890 }))
    if (this.route.snapshot.paramMap.get('id')) {
      this.categoryId = this.route.snapshot.paramMap.get('id')
      this.store.dispatch(new CategoryActions.GetCategory(this.categoryId, { eager: '[children, parent]' }))
    }
    this.category$ = this.store.select(fromCategoryState.getCategory);
    this.categories$ = this.store.select(fromCategoryState.getCategoryOptions);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      level: new FormControl(0, [Validators.required]),
      name: new FormControl('', [Validators.required, noWhitespaceValidator]),
      parentId: new FormControl(null, []),
      image: new FormControl('', [])
    });
    this.form.setValidators([parentIdValidator]);
    this.category$.subscribe({
      next: category => {
        if (category) {
          this.form.patchValue(category);
          this.image = category.image;
          if (category.parent) {
            this.form.controls['parentId'].setValue(category.parent.id);
          }
        }
      }
    });
    this.form.controls['level'].valueChanges.subscribe({
      next: value => {
        if (value === 1) {
          this.form.controls['parentId'].reset();
          this.showDropdown = true;
          this.store.dispatch(new CategoryActions.GetCategoryList({ level: 0, limit: 2345687890 }));
        } else if (value === 2) {
          this.form.controls['parentId'].reset();
          this.showDropdown = true;
          this.store.dispatch(new CategoryActions.GetCategoryList({ level: 1, limit: 2345687890 }));
        } else {
          this.form.controls['parentId'].reset();
          this.showDropdown = false;
          this.store.dispatch(new CategoryActions.EmptyState());
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
    console.log(data);
    delete data.level;
    if (this.categoryId) {
      this.store.dispatch(new CategoryActions.UpdateCategory(this.categoryId, data));
      alertFunctions.typeCustom('Success!', 'Category updated!', 'success');
    } else {
      this.store.dispatch(new CategoryActions.CreateCategory(data));
      alertFunctions.typeCustom('Success!', 'Category added!', 'success');
    }
  }

  selectFile(event: any) {
    this.awsService.uploadFile(event.target.files[0]).subscribe((result: any) => {
      this.form.patchValue({ image: result.image.url });
    }, err => {
      console.log(err);
    });
  }

}
