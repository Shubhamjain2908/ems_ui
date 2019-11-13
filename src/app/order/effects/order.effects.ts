import { Injectable } from '@angular/core';
import { OrderService } from '../order.service';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { OrderActions } from '../actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { LoaderActions } from 'app/shared/actions';
import { Router } from '@angular/router';

@Injectable()
export class OrderEffect {
  constructor(private action$: Actions, private service: OrderService, private router: Router) { }

  @Effect()
  getOrders$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<OrderActions.GetOrderList>(OrderActions.OrderActionTypes.GetOrderList),
      switchMap(data => {
        let limit = Number(data.payload.limit) || 30;
        limit = limit + 1;
        return this.service.getOrders({ ...data.payload, limit: limit }).pipe(
          mergeMap(result => {
            const actions = [];
            if (result.length < limit) {
              actions.push(new LoaderActions.DisablePage())
            } else {
              result.splice(result.length - 1, 1)
              actions.push(new LoaderActions.EnablePage())
            }
            actions.push(new OrderActions.GetOrderListSuccess(result))
            return actions
          }),
        );
      })
    )

  @Effect()
  getOrder$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<OrderActions.GetOrder>(OrderActions.OrderActionTypes.GetOrder),
      switchMap(action => {
        return this.service.getOrder(action.payload, action.data).pipe(
          map(result => new OrderActions.GetOrderSuccess(result)),
        )
      })
    )

  @Effect()
  acceptOrderLine$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<OrderActions.GetOrder>(OrderActions.OrderActionTypes.AcceptOrderLine),
      switchMap(action => {
        return this.service.acceptOrderLine(action.payload, action.data).pipe(
          map(result => new OrderActions.GetOrderLineSuccess(result)),
        )
      })
    )

  @Effect()
  denyOrderLine$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<OrderActions.GetOrder>(OrderActions.OrderActionTypes.DenyOrderLine),
      switchMap(action => {
        return this.service.denyOrderLine(action.payload, action.data).pipe(
          map(result => new OrderActions.GetOrderLineSuccess(result)),
        )
      })
    )
}
