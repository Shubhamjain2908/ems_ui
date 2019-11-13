import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { OptionsActions } from '../actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import { CategoryService } from 'app/category/category.service';

@Injectable()
export class OptionEffect {

    constructor(private action$: Actions, private c_service: CategoryService) { }

    @Effect()
    getCategories$ = (): Observable<Action> =>
        this.action$.pipe(
            ofType<OptionsActions.GetCategoryList>(OptionsActions.OptionsActionTypes.GetCategoryList),
            switchMap(data => {
                let limit = Number(data.payload.limit) || 30;
                limit = limit + 1;
                return this.c_service.getCategories(data.payload).pipe(
                    map(result => new OptionsActions.GetOptionsListSuccess(result)
                    ),
                );
            })
        )
}
