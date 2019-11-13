import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from './../reducers';
import * as fromRoot from './../../reducers';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { CollectionActions } from '../actions';
import { LoaderActions } from 'app/shared/actions';
import { skip, tap, debounceTime } from 'rxjs/operators';
import swal from 'sweetalert2';
import * as alertFunctions from '../../shared/data/sweet-alerts';
@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {

  collections$: Observable<any>;
  loading$: Observable<boolean>;
  nextPage$: Observable<boolean>;
  limit = 10;
  offset = 0;
  page = 1;
  form: FormGroup;

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.loading$ = this.store.select(fromRoot.getLoadingStatus)
    this.collections$ = this.store.select(fromStore.getAllCollections);
    this.nextPage$ = this.store.select(fromRoot.pageDisabled);
    this.store.dispatch(new CollectionActions.GetCollectionList({
      limit: this.limit,
      offset: this.offset
    }))
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      skip(1),
      tap(x => this.store.dispatch(new LoaderActions.SetLoadingTrue())),
      debounceTime(200)
    ).subscribe({
      next: x => {
        this.store.dispatch(new CollectionActions.GetCollectionList(x))
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

  change_page(page) {
    this.page = page > 0 ? page : 1;
    this.offset = 0 + this.limit * (this.page - 1);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        limit: this.limit,
        offset: this.offset
      },
      queryParamsHandling: 'merge',
      skipLocationChange: true
    });
  }

  confirmTextCollection(data) {
    const self = this;
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
        self.deleteCollection(data.id);
      }
    })
  }

  deleteCollection(id: any) {
    this.store.dispatch(new CollectionActions.DeleteCollection(id, { limit: this.limit, offset: this.offset }));
    alertFunctions.typeCustom('Success!', 'Collection deleted!', 'success');
  }

}
