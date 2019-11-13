import { Component, OnInit } from '@angular/core';
import * as fromStore from './../reducers';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { OrderActions } from '../actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderId: string | number;
  order$: Observable<any>;
  order: any;
  address: any;
  addressTypeBool: any;

  constructor(private store: Store<any>, private route: ActivatedRoute) {
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    this.store.dispatch(new OrderActions.GetOrder(this.orderId, {
      eager: '[order_lines.[product.user, product_variant, order_status], address]',
      order: 'created_at'
    }));
    this.order$ = this.store.pipe(select(fromStore.getOrder));
  }

  ngOnInit() {
    this.order$.subscribe({
      next: value => {
        if (!value) {
          return
        }
        this.order = value
        this.address = value.address ? value.address : value.customer_address
        this.addressTypeBool = value.order_delivery_address_type === 'STORE_PICKUP' ? false : true;
      }
    })
  }

  acceptOrderLine(key) {
    this.store.dispatch(new OrderActions.AcceptOrderLine(this.orderId, key.id));
  }

  denyOrderLine(key) {
    this.store.dispatch(new OrderActions.DenyOrderLine(this.orderId, key.id));
  }


  getVariantValueMap(atrributes: any[]) {
    return atrributes.map(r => r.value)
  }

}
