import { Component, OnInit } from '@angular/core';
import { TagActions } from 'app/shared/actions';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { noWhitespaceValidator } from 'app/utils/custom-validators';
import { markFormGroupTouched } from 'app/utils/form.utils';
import * as fromTagState from './../../reducers';

@Component({
  selector: 'app-tag-upload',
  templateUrl: './tag-upload.component.html',
  styleUrls: ['./tag-upload.component.scss']
})
export class TagUploadComponent implements OnInit {

  tagId: any;
  form: FormGroup;
  tag$: Observable<any>;
  showDropdown = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute) {
    this.store.dispatch(new TagActions.EmptyState());
    if (this.route.snapshot.paramMap.get('id')) {
      this.tagId = this.route.snapshot.paramMap.get('id')
      this.store.dispatch(new TagActions.GetTag(this.tagId))
    }
    this.tag$ = this.store.select(fromTagState.getTag);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, noWhitespaceValidator]),
    });
    this.tag$.subscribe({
      next: tag => {
        if (tag) {
          this.form.patchValue(tag);
        }
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      console.log('invalid')
      return;
    }
    const data = this.form.value;
    delete data.type;
    if (this.tagId) {
      this.store.dispatch(new TagActions.UpdateTag(this.tagId, data))
    } else {
      this.store.dispatch(new TagActions.CreateTag(data))
    }
  }

}
