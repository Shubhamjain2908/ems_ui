import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { AttributeActions } from '../actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { LoaderActions } from 'app/shared/actions';
import { Router } from '@angular/router';
import { AttributeService } from '../attribute.service';

@Injectable()
export class AttributeChoiceEffect {
    constructor(private action$: Actions, private service: AttributeService, private router: Router) { }

    @Effect()
    getAttributeChoices$ = (): Observable<Action> =>
        this.action$.pipe(
            ofType<AttributeActions.GetAttributeChoiceList>(AttributeActions.AttributeActionTypes.GetAttributeChoiceList),
            switchMap(data => {
                let limit = data.data.limit || 30;
                limit = limit + 1;
                return this.service.getAttributeChoices(data.attributeId, data.data).pipe(
                    mergeMap(result => {
                        const actions = [];
                        if (result.length < 31) {
                            actions.push(new LoaderActions.DisablePage())
                        } else {
                            result.splice(result.length - 1, 1)
                            actions.push(new LoaderActions.EnablePage())
                        }
                        actions.push(new AttributeActions.GetAttributeChoiceListSuccess(result))
                        return actions
                    })
                );
            })
        )

    @Effect()
    getAttributeChoice$ = (): Observable<Action> =>
        this.action$.pipe(
            ofType<AttributeActions.GetAttributeChoice>(AttributeActions.AttributeActionTypes.GetAttributeChoice),
            switchMap(action => {
                return this.service.getAttributeChoice(action.payload, action.data).pipe(
                    map(result => new AttributeActions.GetAttributeChoiceSuccess(result)),
                )
            })
        )

    @Effect({ dispatch: false })
    createAttributeChoices$ = (): Observable<Action> =>
        this.action$.pipe(
            ofType<AttributeActions.CreateAttributeChoice>(AttributeActions.AttributeActionTypes.CreateAttributeChoice),
            tap((action: any) => {
                this.service.createAttributeChoices(action.attributeId, action.data).subscribe({
                    next: x => this.router.navigate(['attribute', action.attributeId])
                })
            })
        )

    @Effect({ dispatch: false })
    updateAttributeChoices$ = (): Observable<Action> =>
        this.action$.pipe(
            ofType<AttributeActions.UpdateAttributeChoice>(AttributeActions.AttributeActionTypes.UpdateAttributeChoice),
            tap((action: any) => {
                return this.service.updateAttributeChoices(action.attributeChoiceId, action.data).subscribe({
                    next: x => this.router.navigate(['attribute', action.options.attributeId])
                })
            })
        )

    @Effect()
    deleteAttributeChoices$ = (): Observable<Action> =>
        this.action$.pipe(
            ofType<AttributeActions.DeleteAttributeChoice>(AttributeActions.AttributeActionTypes.DeleteAttributeChoice),
            switchMap(action => {
                return this.service.deleteAttributeChoices(action.attributeChoiceId).pipe(
                    map(result => new AttributeActions.GetAttributeChoiceList(action.options.attributeId, {})),
                )
            })
        )
}
