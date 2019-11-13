import { Injectable } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { PaymentsActions } from '../actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { LoaderActions } from 'app/shared/actions';
import { Router } from '@angular/router';
import * as alertFunctions from '../../shared/data/sweet-alerts';

@Injectable()
export class PaymentsEffect {
  constructor(private action$: Actions, private service: PaymentsService, private router: Router) { }

  @Effect()
  getAllPayments$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<PaymentsActions.GetPaymentsList>(PaymentsActions.PaymentsActionTypes.GetPaymentsList),
      switchMap(data => {
        let limit = Number(data.payload.limit) || 10;
        limit = limit + 1;
        return this.service.getPayments({ ...data.payload, limit: limit }).pipe(
          mergeMap(result => {
            const actions = [];
            if (result.length < limit - 1) {
              actions.push(new LoaderActions.DisablePage())
            } else {
              result.splice(result.length - 1, 1)
              actions.push(new LoaderActions.EnablePage())
            }
            actions.push(new PaymentsActions.GetPaymentsListSuccess(result))
            return actions
          }),
        );
      })
    )

  @Effect()
  getPayment$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<PaymentsActions.GetPayments>(PaymentsActions.PaymentsActionTypes.GetPayments),
      switchMap(action => {
        return this.service.getPayment(action.payload, action.data).pipe(
          map(result => new PaymentsActions.GetPaymentsSuccess(result)),
        )
      })
    )
}
