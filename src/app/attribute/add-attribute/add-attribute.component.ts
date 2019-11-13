import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AttributeActions } from '../actions';
import { noWhitespaceValidator } from 'app/utils/custom-validators';
import { markFormGroupTouched } from 'app/utils/form.utils';
import * as fromStore from './../reducers';
import * as fromRoot from 'app/reducers';
import { CategoryActions } from 'app/shared/actions';
import * as alertFunctions from '../../shared/data/sweet-alerts';
@Component({
  selector: 'app-add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.scss']
})
export class AddAttributeComponent implements OnInit {

  form: FormGroup;
  attributeId: number | string;
  attribute$: Observable<any>;
  categories$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute
  ) {
    this.store.dispatch(new AttributeActions.EmptyState())
    this.attributeId = this.route.snapshot.paramMap.get('attributeId');
    if (this.attributeId) {
      this.store.dispatch(new AttributeActions.GetAttribute(this.attributeId, { eager: '[category_variants]' }));
    }
    this.store.dispatch(new CategoryActions.EmptyState());
    this.store.dispatch(new CategoryActions.GetCategoryList({ level: 0, eager: 'children.^', limit: 2345687890 }))
    this.attribute$ = this.store.pipe(select(fromStore.getAttribute));
    this.categories$ = this.store.pipe(select(fromRoot.getAllCategories));
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, noWhitespaceValidator]),
      category_variants: new FormControl([], [])
    });
    this.attribute$.subscribe({
      next: value => {
        // tslint:disable-next-line: no-unused-expression
        value ? this.form.patchValue(value) : null;
      }
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }
    if (this.attributeId) {
      this.store.dispatch(new AttributeActions.UpdateAttribute(
        this.attributeId,
        this.form.value));
      alertFunctions.typeCustom('Success!', 'Attribute updated!', 'success');
      return;
    }
    this.store.dispatch(new AttributeActions.CreateAttribute(this.form.value));
    alertFunctions.typeCustom('Success!', 'Attribute added!', 'success');
  }

}
