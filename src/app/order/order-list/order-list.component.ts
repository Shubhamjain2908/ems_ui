import { Component, OnInit } from '@angular/core';
import * as fromStore from './../reducers';
import * as fromRoot from './../../reducers';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderActions } from '../actions';
import { LoaderActions } from 'app/shared/actions';
import { skip, tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders$: Observable<any>;
  loading$: Observable<boolean>;
  nextPage$: Observable<boolean>;
  limit = 30;
  offset = 0;
  page = 1;
  form: FormGroup;
  supplierId: any;

  orderStatusOptions = [
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Canceled', value: 'CANCELED' },
    { label: 'Returned', value: 'RETURNED' },
    { label: 'Waiting for dispatch', value: 'WAITING_FOR_DISPATCH' },
    { label: 'Dispatched', value: 'DISPATCHED' },
    { label: 'Delivered', value: 'DELIVERED' },
  ]

  paymentModeOptions = [
    { label: 'Online', value: 'ONLINE' },
    { label: 'Cash on delivery', value: 'COD' }
  ]

  orderTypeOptions = [
    { label: 'RETAILER TO SUPPLIER', value: 'RETAILER_TO_SUPPLIER' },
    { label: 'RETAILER TO CUSTOMER VIRTUAL INVENTORY', value: 'RETAILER_TO_CUSTOMER_VIRTUAL_INVENTORY' },
    { label: 'RETAILER TO CUSTOMER PHYSICAL INVENTORY', value: 'RETAILER_TO_CUSTOMER_PHYSICAL_INVENTORY' },
  ]

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.supplierId = this.route.snapshot.paramMap.get('supplierId');
    this.store.dispatch(new OrderActions.GetOrderList({ limit: this.limit, offset: this.offset, order: 'created_at DESC' }));
    this.orders$ = this.store.pipe(select(fromStore.getAllOrders));
    this.loading$ = this.store.select(fromRoot.getLoadingStatus);
    this.nextPage$ = this.store.select(fromRoot.pageDisabled);
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      skip(1),
      tap(x => this.store.dispatch(new LoaderActions.SetLoadingTrue())),
      debounceTime(200)
    ).subscribe({
      next: x => {
        this.store.dispatch(new OrderActions.GetOrderList(x));
      }
    });
    this.form = this.formBuilder.group({
      search: new FormControl('', []),
      status: new FormControl('', []),
      payment_mode: new FormControl('', []),
      order_type: new FormControl('', []),
      order: new FormControl('created_at DESC', [])
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
        offset: this.offset,
        order: 'created_at DESC'
      },
      queryParamsHandling: 'merge',
      skipLocationChange: true
    });
  }

}
