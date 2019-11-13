import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from './../reducers';
import { Store, select } from '@ngrx/store';
import { AttributeActions } from '../actions';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { skip, tap, debounceTime } from 'rxjs/operators';
import { LoaderActions } from 'app/shared/actions';
@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss']
})
export class AttributeListComponent implements OnInit {

  attributes$: Observable<any>;
  attributeId: number | string;
  form: FormGroup;
  limit = 30;
  offset = 0;
  page = 1;

  constructor(private store: Store<any>, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.attributeId = this.route.snapshot.paramMap.get('attributeId');
    if (this.attributeId) {
      this.store.dispatch(new AttributeActions.GetAttributeChoiceList(this.attributeId, {}));
      this.attributes$ = this.store.pipe(select(fromStore.getAllAttributeChoices));
    } else {
      this.store.dispatch(new AttributeActions.GetAttributeList({}))
      this.attributes$ = this.store.pipe(select(fromStore.getAllAttributes));
    }
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      skip(1),
      tap(x => this.store.dispatch(new LoaderActions.SetLoadingTrue())),
      debounceTime(200)
    ).subscribe({
      next: x => {
        if (this.attributeId) {
          if (!x.level) {
            this.store.dispatch(new AttributeActions.GetAttributeChoiceList(this.attributeId, { ...x }));
          } else {
            this.store.dispatch(new AttributeActions.GetAttributeChoiceList(this.attributeId, x));
          }
        } else {
          if (!x.level) {
            this.store.dispatch(new AttributeActions.GetAttributeList({ ...x }));
          } else {
            this.store.dispatch(new AttributeActions.GetAttributeList(x));
          }
        }

      }
    });
    this.form = this.formBuilder.group({
      search: new FormControl('', [])
    })
    this.form.valueChanges.subscribe({
      next: x => {
        this.limit = 10;
        this.offset = 0;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            limit: this.limit,
            offset: this.offset,
            ...x
          },
          queryParamsHandling: 'merge',
          skipLocationChange: true
        });
      }
    })
  }

  deleteAttributeChoice(id: any) {
    if (!this.attributeId) {
      return;
    }
    this.store.dispatch(new AttributeActions.DeleteAttributeChoice(id, { attributeId: this.attributeId }));
    alertFunctions.typeCustom('Success!', 'Attribute choice deleted!', 'success');
  }

  confirmTextAttribute(data) {
    const self = this;
    console.log(data);
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
        self.deleteAttribute(data.id);
      }
    })
  }

  confirmTextAttributeChoice(data) {
    const self = this;
    console.log(data);
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
        self.deleteAttributeChoice(data.id);
      }
    })
  }

  deleteAttribute(id: any) {
    this.store.dispatch(new AttributeActions.DeleteAttribute(id));
    alertFunctions.typeCustom('Success!', 'Attribute deleted!', 'success');
  }

}
