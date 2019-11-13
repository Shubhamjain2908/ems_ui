import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromRoot from './../../reducers';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderActions, CategoryActions } from 'app/shared/actions';
import { tap, debounceTime, skip } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import * as alertFunctions from '../../shared/data/sweet-alerts';
@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.scss']
})

export class CategoryComponent implements OnInit {

  categories$: Observable<any[]>;
  loading$: Observable<boolean>;
  nextPage$: Observable<boolean>;
  limit = 30;
  offset = 0;
  page = 1;
  form: FormGroup;
  level: string | number = 0;

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.loading$ = this.store.select(fromRoot.getLoadingStatus)
    this.categories$ = this.store.select(fromRoot.getAllCategories);
    this.nextPage$ = this.store.select(fromRoot.pageDisabled);
    this.level = this.route.snapshot.queryParamMap.get('level');
    this.store.dispatch(new CategoryActions.GetCategoryList({
      parentId: this.route.snapshot.queryParamMap.get('parentId'),
      level: this.level || 0,
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
        if (!x.level) {
          this.store.dispatch(new CategoryActions.GetCategoryList({ ...x, level: this.level || 0 }));
        } else {
          this.level = x.level || 0;
          this.store.dispatch(new CategoryActions.GetCategoryList(x));
        }
      }
    });
    this.form = this.formBuilder.group({
      search: new FormControl('', [])
    })
    this.form.valueChanges.subscribe({
      next: x => {
        this.limit = 30;
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

  confirmTextCategory(data) {
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
        self.deleteCategory(data.id);
      }
    })
  }

  deleteCategory(id: any) {
    this.store.dispatch(new CategoryActions.DeleteCategory(id, { limit: this.limit, offset: this.offset, level: this.level || 0 }));
    alertFunctions.typeCustom('Success!', 'Category deleted!', 'success');
  }

}
