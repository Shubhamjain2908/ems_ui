import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { PaymentsActions } from '../actions';
import * as fromStore from '../reducers';

@Component({
  selector: 'app-payments-detail',
  templateUrl: './payments-detail.component.html',
  styleUrls: ['./payments-detail.component.scss']
})
export class PaymentsDetailComponent implements OnInit {

  payments$: Observable<any>;
  paymentsId: any;
  payments: any;
  noImages = true;
  isPublished = false;
  imagesError = false;

  constructor(private store: Store<any>, private route: ActivatedRoute) {
    this.paymentsId = this.route.snapshot.paramMap.get('paymentsId');
    this.store.dispatch(new PaymentsActions.GetPayments(this.paymentsId));
    this.payments$ = this.store.pipe(select(fromStore.getPayments));
  }

  ngOnInit() {
    this.payments$.subscribe({
      next: value => {
        if (!value) {
          return;
        }
        this.payments = value;
        this.isPublished = value.is_published;

      }
    })
  }

}
