import { Injectable } from '@angular/core';
import { CategoryService } from '../category.service';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { LoaderActions, CategoryActions } from 'app/shared/actions';
import { Router } from '@angular/router';

@Injectable()
export class CategoryEffect {
  constructor(private action$: Actions, private service: CategoryService, private router: Router) { }

  @Effect()
  getCategories$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CategoryActions.GetCategoryList>(CategoryActions.CategoryActionTypes.GetCategoryList),
      switchMap(data => {
        let limit = Number(data.payload.limit) || 30;
        limit = limit + 1;
        // Number(data.payload.limit) = limit;
        return this.service.getCategories({ ...data.payload, limit: limit }).pipe(
          mergeMap(result => {
            const actions = [];
            if (result.length < limit) {
              actions.push(new LoaderActions.DisablePage())
            } else {
              result.splice(result.length - 1, 1)
              actions.push(new LoaderActions.EnablePage())
            }
            actions.push(new CategoryActions.GetCategoryListSuccess(result))
            return actions
          }),
        );
      })
    )

  @Effect()
  getCategory$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CategoryActions.GetCategory>(CategoryActions.CategoryActionTypes.GetCategory),
      switchMap(action => {
        return this.service.getCategory(action.payload, action.data).pipe(
          map(result => new CategoryActions.GetCategorySuccess(result)),
        )
      })
    )

  @Effect({ dispatch: false })
  createCategory$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CategoryActions.CreateCategory>(CategoryActions.CategoryActionTypes.CreateCategory),
      map(action => action.payload),
      tap(data => {
        this.service.createCategory(data).subscribe({
          next: x => this.router.navigate(['/category'])
        })
      })
    )

  @Effect({ dispatch: false })
  updateCategory$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CategoryActions.UpdateCategory>(CategoryActions.CategoryActionTypes.UpdateCategory),
      tap((action: any) => {
        return this.service.updateCategory(action.payload, action.data).subscribe({
          next: x => this.router.navigate(['/category'])
        })
      })
    )

  @Effect()
  deleteCategory$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CategoryActions.DeleteCategory>(CategoryActions.CategoryActionTypes.DeleteCategory),
      switchMap(action => {
        return this.service.deleteCategory(action.payload).pipe(
          map(result => new CategoryActions.GetCategoryList(action.options)),
        )
      })
    )

  @Effect()
  getVariantAttributes$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<CategoryActions.GetVariantAttributes>(CategoryActions.CategoryActionTypes.GetVariantAttributes),
      map(action => action.payload),
      switchMap(data => {
        return this.service.getVariantAttributes(data).pipe(
          map(result => new CategoryActions.GetVariantAttributesSuccess(result))
        )
      })
    )
}
