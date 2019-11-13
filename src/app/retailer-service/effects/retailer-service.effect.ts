import { Injectable } from '@angular/core';
import { RetailerServiceService } from '../retailer-service.service';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { RetailerServiceActions } from '../actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { LoaderActions } from 'app/shared/actions';
import { Router } from '@angular/router';

@Injectable()
export class RetailerServiceEffect {
  constructor(private action$: Actions, private service: RetailerServiceService, private router: Router) { }

  @Effect()
  getCategories$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<RetailerServiceActions.GetRetailerServiceList>(RetailerServiceActions.RetailerServiceActionTypes.GetRetailerServiceList),
      switchMap(data => {
        // console.log(data)
        let limit = Number(data.payload.limit) || 30;
        limit = limit + 1;
        // data.payload.limit = limit;
        console.log('dsajkdjaskldjaskldjklsajdklas', data.payload);
        return this.service.getRetailerServices({ ...data.payload, limit: limit }).pipe(
          mergeMap(result => {
            console.log(result);
            const actions = [];
            if (result.length < limit - 1) {
              actions.push(new LoaderActions.DisablePage())
            } else {
              result.splice(result.length - 1, 1)
              actions.push(new LoaderActions.EnablePage())
            }
            actions.push(new RetailerServiceActions.GetRetailerServiceListSuccess(result))
            return actions
          }),
        );
      })
    )

  @Effect()
  getRetailerService$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<RetailerServiceActions.GetRetailerService>(RetailerServiceActions.RetailerServiceActionTypes.GetRetailerService),
      switchMap(action => {
        return this.service.getRetailerService(action.payload, action.data).pipe(
          map(result => new RetailerServiceActions.GetRetailerServiceSuccess(result)),
        )
      })
    )

  @Effect({ dispatch: false })
  createRetailerService$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<RetailerServiceActions.CreateRetailerService>(RetailerServiceActions.RetailerServiceActionTypes.CreateRetailerService),
      map(action => action.payload),
      tap(data => {
        this.service.createRetailerService(data).subscribe({
          next: x => this.router.navigate(['/service'])
        })
      })
    )

  @Effect({ dispatch: false })
  updateRetailerService$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<RetailerServiceActions.UpdateRetailerService>(RetailerServiceActions.RetailerServiceActionTypes.UpdateRetailerService),
      tap((action: any) => {
        return this.service.updateRetailerService(action.payload, action.data).subscribe({
          next: x => this.router.navigate(['/service/detail', x.id])
        })
      })
    )
  @Effect()
  patchRetailerService$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<RetailerServiceActions.PatchRetailerService>(RetailerServiceActions.RetailerServiceActionTypes.PatchRetailerService),
      switchMap(action => {
        return this.service.patchRetailerService(action.payload, action.data).pipe(
          map(result => new RetailerServiceActions.GetRetailerService(result.id)),
        )
      })
    )

  @Effect()
  deleteRetailerService$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<RetailerServiceActions.DeleteRetailerService>(RetailerServiceActions.RetailerServiceActionTypes.DeleteRetailerService),
      switchMap(action => {
        return this.service.deleteRetailerService(action.payload).pipe(
          map(result => new RetailerServiceActions.GetRetailerServiceList(action.options)),
        )
      })
    )

  @Effect()
  addRetailerServiceImage$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<RetailerServiceActions.AddRetailerServiceImage>(RetailerServiceActions.RetailerServiceActionTypes.AddRetailerServiceImage),
      switchMap(action => {
        return this.service.addRetailerServiceImage(action.serviceId, action.data).pipe(
          map(result => new RetailerServiceActions.GetRetailerService(action.serviceId))
        )
      })
    )

  @Effect()
  addRetailerServiceVariantImage$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<RetailerServiceActions.AddRetailerServiceVariantImage>(RetailerServiceActions.RetailerServiceActionTypes.AddRetailerServiceVariantImage),
      switchMap(action => {
        return this.service.addRetailerServiceVariantImage(action.serviceVariantId, action.data).pipe(
          map(result => new RetailerServiceActions.GetRetailerService(action.options.serviceId))
        )
      })
    )
}
