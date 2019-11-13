import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RetailerServiceActions } from '../actions';
import * as fromStore from '../reducers';
import * as fromRoot from '../../reducers';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderActions } from 'app/shared/actions';
import { skip, tap } from 'rxjs/operators';

@Component({
  selector: 'app-retailer-service-list',
  templateUrl: './retailer-service-list.component.html',
  styleUrls: ['./retailer-service-list.component.scss']
})
export class RetailerServiceListComponent implements OnInit {

  services$: Observable<any>;
  loading$: Observable<boolean>;
  nextPage$: Observable<boolean>;
  limit = 30;
  offset = 0;
  page = 1;
  form: FormGroup;
  supplierId: any;

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.supplierId = this.route.snapshot.paramMap.get('supplierId');
    this.store.dispatch(new RetailerServiceActions.GetRetailerServiceList({ user_id: this.supplierId }));
    this.services$ = this.store.pipe(select(fromStore.getAllRetailerServices));
    this.loading$ = this.store.select(fromRoot.getLoadingStatus);
    this.nextPage$ = this.store.select(fromRoot.pageDisabled);
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      skip(1),
      tap(x => this.store.dispatch(new LoaderActions.SetLoadingTrue()))
    ).subscribe({
      next: x => {
        console.log('dhkjsadjsakldjsakl');
        this.store.dispatch(new RetailerServiceActions.GetRetailerServiceList(x));
      }
    });
  }

  change_page(page) {
    console.log(this.limit, this.route, this.offset);

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

}
