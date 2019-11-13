import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { AttributeActions } from '../actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, mergeMap, map, tap } from 'rxjs/operators';
import { LoaderActions } from 'app/shared/actions';
import { Router } from '@angular/router';
import { AttributeService } from '../attribute.service';

@Injectable()
export class AttributeEffect {
  constructor(private action$: Actions, private service: AttributeService, private router: Router) { }

  @Effect()
  getAttributes$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<AttributeActions.GetAttributeList>(AttributeActions.AttributeActionTypes.GetAttributeList),
      switchMap(data => {
        let limit = Number(data.payload.limit) || 30;
        limit = limit + 1;
        return this.service.getAttributes(data.payload).pipe(
          mergeMap(result => {
            const actions = [];
            if (result.length < 31) {
              actions.push(new LoaderActions.DisablePage())
            } else {
              result.splice(result.length - 1, 1)
              actions.push(new LoaderActions.EnablePage())
            }
            actions.push(new AttributeActions.GetAttributeListSuccess(result))
            return actions
          }),
        );
      })
    )

  @Effect()
  getAttribute$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<AttributeActions.GetAttribute>(AttributeActions.AttributeActionTypes.GetAttribute),
      switchMap(action => {
        return this.service.getAttribute(action.payload, action.data).pipe(
          map(result => new AttributeActions.GetAttributeSuccess(result)),
        )
      })
    )

  @Effect({ dispatch: false })
  createAttribute$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<AttributeActions.CreateAttribute>(AttributeActions.AttributeActionTypes.CreateAttribute),
      map(action => action.payload),
      tap(data => {
        this.service.createAttribute(data).subscribe({
          next: x => this.router.navigate(['/attribute'])
        })
      })
    )

  @Effect({ dispatch: false })
  updateAttribute$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<AttributeActions.UpdateAttribute>(AttributeActions.AttributeActionTypes.UpdateAttribute),
      tap((action: any) => {
        return this.service.updateAttribute(action.payload, action.data).subscribe({
          next: x => this.router.navigate(['/attribute'])
        });
      })
    )

  @Effect()
  deleteAttribute$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<AttributeActions.DeleteAttribute>(AttributeActions.AttributeActionTypes.DeleteAttribute),
      switchMap(action => {
        return this.service.deleteAttribute(action.payload).pipe(
          map(result => new AttributeActions.GetAttributeList(action.options)),
        )
      })
    )
}
