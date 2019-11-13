import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CollectionService } from '../collection.service';
import { CollectionActions } from '../actions';
import { LoaderActions } from 'app/shared/actions';

@Injectable()
export class CollectionEffect {
  constructor(private action$: Actions, private service: CollectionService, private router: Router) { }

  @Effect()
  getCollections$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CollectionActions.GetCollectionList>(CollectionActions.CollectionActionTypes.GetCollectionList),
      switchMap(data => {
        let limit = Number(data.payload.limit) || 10;
        limit = limit + 1;
        // Number(data.payload.limit) = limit;
        return this.service.getCollections({ ...data.payload, limit: limit }).pipe(
          mergeMap(result => {
            const actions = [];
            if (result.length < limit) {
              actions.push(new LoaderActions.DisablePage())
            } else {
              result.splice(result.length - 1, 1)
              actions.push(new LoaderActions.EnablePage())
            }
            actions.push(new CollectionActions.GetCollectionListSuccess(result))
            return actions
          }),
        );
      })
    )

  @Effect()
  getCollection$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CollectionActions.GetCollection>(CollectionActions.CollectionActionTypes.GetCollection),
      switchMap(action => {
        return this.service.getCollection(action.payload, action.data).pipe(
          map(result => new CollectionActions.GetCollectionSuccess(result)),
        )
      })
    )

  @Effect({ dispatch: false })
  createCollection$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CollectionActions.CreateCollection>(CollectionActions.CollectionActionTypes.CreateCollection),
      map(action => action.payload),
      tap(data => {
        this.service.createCollection(data).subscribe({
          next: x => this.router.navigate(['/collection'])
        })
      })
    )

  @Effect({ dispatch: false })
  updateCollection$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CollectionActions.UpdateCollection>(CollectionActions.CollectionActionTypes.UpdateCollection),
      tap((action: any) => {
        return this.service.updateCollection(action.payload, action.data).subscribe({
          next: x => this.router.navigate(['/collection'])
        });
      })
    )

  @Effect()
  deleteCollection$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CollectionActions.DeleteCollection>(CollectionActions.CollectionActionTypes.DeleteCollection),
      switchMap(action => {
        return this.service.deleteCollection(action.payload).pipe(
          map(result => new CollectionActions.GetCollectionList(action.options)),
        )
      })
    )
}
