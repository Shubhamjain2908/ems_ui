import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CouponService } from '../coupon.service';
import { CouponActions } from '../actions';
import { LoaderActions } from 'app/shared/actions';
import * as alertFunctions from '../../shared/data/sweet-alerts';
@Injectable()
export class CouponEffect {
  constructor(private action$: Actions, private service: CouponService, private router: Router) { }

  @Effect()
  getCoupons$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CouponActions.GetCouponList>(CouponActions.CouponActionTypes.GetCouponList),
      switchMap(data => {
        let limit = Number(data.payload.limit) || 30;
        limit = limit + 1;
        // Number(data.payload.limit) = limit;
        return this.service.getCoupons({ ...data.payload, limit: limit }).pipe(
          mergeMap(result => {
            const actions = [];
            if (result.length < limit) {
              actions.push(new LoaderActions.DisablePage())
            } else {
              result.splice(result.length - 1, 1)
              actions.push(new LoaderActions.EnablePage())
            }
            actions.push(new CouponActions.GetCouponListSuccess(result))
            return actions
          }),
        );
      })
    )

  @Effect()
  getCoupon$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CouponActions.GetCoupon>(CouponActions.CouponActionTypes.GetCoupon),
      switchMap(action => {
        return this.service.getCoupon(action.payload, action.data).pipe(
          map(result => new CouponActions.GetCouponSuccess(result)),
        )
      })
    )

  @Effect({ dispatch: false })
  createCoupon$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CouponActions.CreateCoupon>(CouponActions.CouponActionTypes.CreateCoupon),
      map(action => action.payload),
      tap(data => {
        this.service.createCoupon(data).subscribe({
          next: x => this.router.navigate(['/coupon']),
          error: x => alertFunctions.typeCustom('Error!', x.error.message, 'error')
        })
      })
    )

  @Effect({ dispatch: false })
  updateCoupon$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CouponActions.UpdateCoupon>(CouponActions.CouponActionTypes.UpdateCoupon),
      tap((action: any) => {
        return this.service.updateCoupon(action.payload, action.data).subscribe({
          next: x => this.router.navigate(['/coupon']),
          error: x => alertFunctions.typeCustom('Error!', x.error.message, 'error')
        });
      })
    )

  @Effect()
  deleteCoupon$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CouponActions.DeleteCoupon>(CouponActions.CouponActionTypes.DeleteCoupon),
      switchMap(action => {
        return this.service.deleteCoupon(action.payload).pipe(
          map(result => new CouponActions.GetCouponList(action.options)),
        )
      })
    )

  @Effect()
  getCodeSuggestion$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CouponActions.GetCouponCodeSuggestion>(CouponActions.CouponActionTypes.GetCouponCodeSuggestion),
      switchMap(action => {
        return this.service.getCouponCodeSuggestion().pipe(
          map(result => new CouponActions.GetCouponCodeSuggestionSuccess(result.code))
        )
      })
    )
}
