import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { markFormGroupTouched } from 'app/utils/form.utils';
import { AttributeActions } from '../actions';
import { ActivatedRoute } from '@angular/router';
import { noWhitespaceValidator } from 'app/utils/custom-validators';
import { Observable } from 'rxjs';
import * as fromStore from './../reducers';

@Component({
  selector: 'app-add-attribute-choice',
  templateUrl: './add-attribute-choice.component.html',
  styleUrls: ['./add-attribute-choice.component.scss']
})
export class AddAttributeChoiceComponent implements OnInit {

  form: FormGroup;
  attributeId: number | string;
  attributeChoiceId: number | string;
  attributeChoice$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute
  ) {
    this.attributeId = this.route.snapshot.paramMap.get('attributeId');
    this.attributeChoiceId = this.route.snapshot.paramMap.get('attributeChoiceId');
    if (this.attributeChoiceId) {
      this.store.dispatch(new AttributeActions.GetAttributeChoice(this.attributeChoiceId));
    }
    this.attributeChoice$ = this.store.pipe(select(fromStore.getAttributeChoice));
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, noWhitespaceValidator])
    });
    if (this.attributeChoiceId) {
      this.attributeChoice$.subscribe({
        next: value => {
          // tslint:disable-next-line: no-unused-expression
          value ? this.form.patchValue(value) : null;
        }
      })
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }
    if (this.attributeChoiceId) {
      this.store.dispatch(new AttributeActions.UpdateAttributeChoice(
        this.attributeChoiceId,
        this.form.value,
        { attributeId: this.attributeId }));
      return;
    }
    this.store.dispatch(new AttributeActions.CreateAttributeChoice(this.attributeId, this.form.value));
  }

}
