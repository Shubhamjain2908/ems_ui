import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OfferService } from '../offer.service';
import { OfferActions } from '../actions';
import { LoaderActions } from 'app/shared/actions';

@Injectable()
export class OfferEffect {
  constructor(private action$: Actions, private service: OfferService, private router: Router) { }

  @Effect()
  getOffers$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<OfferActions.GetOfferList>(OfferActions.OfferActionTypes.GetOfferList),
      switchMap(data => {
        let limit = Number(data.payload.limit) || 30;
        limit = limit + 1;
        // Number(data.payload.limit) = limit;
        return this.service.getOffers({ ...data.payload, limit: limit }).pipe(
          mergeMap(result => {
            const actions = [];
            if (result.length < limit) {
              actions.push(new LoaderActions.DisablePage())
            } else {
              result.splice(result.length - 1, 1)
              actions.push(new LoaderActions.EnablePage())
            }
            actions.push(new OfferActions.GetOfferListSuccess(result))
            return actions
          }),
        );
      })
    )

  @Effect()
  getOffer$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<OfferActions.GetOffer>(OfferActions.OfferActionTypes.GetOffer),
      switchMap(action => {
        return this.service.getOffer(action.payload, action.data).pipe(
          map(result => new OfferActions.GetOfferSuccess(result)),
        )
      })
    )

  @Effect({ dispatch: false })
  createOffer$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<OfferActions.CreateOffer>(OfferActions.OfferActionTypes.CreateOffer),
      map(action => action.payload),
      tap(data => {
        this.service.createOffer(data).subscribe({
          next: x => this.router.navigate(['/offer'])
        })
      })
    )

  @Effect({ dispatch: false })
  updateOffer$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<OfferActions.UpdateOffer>(OfferActions.OfferActionTypes.UpdateOffer),
      tap((action: any) => {
        return this.service.updateOffer(action.payload, action.data).subscribe({
          next: x => this.router.navigate(['/offer'])
        });
      })
    )

  @Effect()
  deleteOffer$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<OfferActions.DeleteOffer>(OfferActions.OfferActionTypes.DeleteOffer),
      switchMap(action => {
        return this.service.deleteOffer(action.payload).pipe(
          map(result => new OfferActions.GetOfferList(action.options)),
        )
      })
    )
}
