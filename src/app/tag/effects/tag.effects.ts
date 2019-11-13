import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { LoaderActions, TagActions } from 'app/shared/actions';
import { Router } from '@angular/router';
import { TagService } from '../tag.service';

@Injectable()
export class TagEffect {
  constructor(private action$: Actions, private service: TagService, private router: Router) { }

  @Effect()
  getTags$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<TagActions.GetTagList>(TagActions.TagActionTypes.GetTagList),
      switchMap(data => {
        let limit = Number(data.payload.limit) || 30;
        limit = limit + 1;
        // Number(data.payload.limit) = limit;
        return this.service.getTags({ ...data.payload, limit: limit }).pipe(
          mergeMap(result => {
            const actions = [];
            if (result.length < limit) {
              actions.push(new LoaderActions.DisablePage())
            } else {
              result.splice(result.length - 1, 1)
              actions.push(new LoaderActions.EnablePage())
            }
            actions.push(new TagActions.GetTagListSuccess(result))
            return actions
          }),
        );
      })
    )

  @Effect()
  getTag$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<TagActions.GetTag>(TagActions.TagActionTypes.GetTag),
      switchMap(action => {
        return this.service.getTag(action.payload, action.data).pipe(
          map(result => new TagActions.GetTagSuccess(result)),
        )
      })
    )

  @Effect({ dispatch: false })
  createTag$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<TagActions.CreateTag>(TagActions.TagActionTypes.CreateTag),
      map(action => action.payload),
      tap(data => {
        this.service.createTag(data).subscribe({
          next: x => this.router.navigate(['/tag'])
        })
      })
    )

  @Effect({ dispatch: false })
  updateTag$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<TagActions.UpdateTag>(TagActions.TagActionTypes.UpdateTag),
      tap((action: any) => {
        return this.service.updateTag(action.payload, action.data).subscribe({
          next: x => this.router.navigate(['/tag'])
        })
      })
    )

  @Effect()
  deleteTag$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<TagActions.DeleteTag>(TagActions.TagActionTypes.DeleteTag),
      switchMap(action => {
        return this.service.deleteTag(action.payload).pipe(
          map(result => new TagActions.GetTagList(action.options)),
        )
      })
    )
}
