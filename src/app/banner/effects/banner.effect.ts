import { Injectable } from '@angular/core';
import { BannerService } from '../banner.service';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { BannerActions } from '../actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { LoaderActions } from 'app/shared/actions';
import { Router } from '@angular/router';

@Injectable()
export class BannerEffect {
    constructor(private action$: Actions, private service: BannerService, private router: Router) { }

    @Effect()
    getBanners$ = (): Observable<Action> =>
        this.action$.pipe(
            ofType<BannerActions.GetBannerList>(BannerActions.BannerActionTypes.GetBannerList),
            switchMap(data => {
                let limit = Number(data.payload.limit) || 30;
                limit = limit + 1;
                return this.service.getBanners(data.payload).pipe(
                    mergeMap(result => {
                        const actions = [];
                        if (result.length < 31) {
                            actions.push(new LoaderActions.DisablePage())
                        } else {
                            result.splice(result.length - 1, 1)
                            actions.push(new LoaderActions.EnablePage())
                        }
                        actions.push(new BannerActions.GetBannerListSuccess(result))
                        return actions
                    }),
                );
            })
        )

    @Effect()
    getBanner$ = (): Observable<Action> =>
        this.action$.pipe(
            ofType<BannerActions.GetBanner>(BannerActions.BannerActionTypes.GetBanner),
            switchMap(action => {
                return this.service.getBanner(action.payload, action.data).pipe(
                    map(result => new BannerActions.GetBannerSuccess(result)),
                )
            })
        )

    @Effect({ dispatch: false })
    createBanner$ = (): Observable<Action> =>
        this.action$.pipe(
            ofType<BannerActions.CreateBanner>(BannerActions.BannerActionTypes.CreateBanner),
            map(action => action.payload),
            tap(data => {
                this.service.createBanner(data).subscribe({
                    next: x => this.router.navigate(['/banner/list'])
                })
            })
        )

    @Effect({ dispatch: false })
    updateBanner$ = (): Observable<Action> =>
        this.action$.pipe(
            ofType<BannerActions.UpdateBanner>(BannerActions.BannerActionTypes.UpdateBanner),
            tap((action: any) => {
                this.service.updateBanner(action.payload, action.data).subscribe({
                    next: x => this.router.navigate(['/banner/list'])
                })
            })
            // switchMap(action => {
            //     return this.service.updateBanner(action.payload, action.data).pipe(
            //         map(result => new BannerActions.GetBannerSuccess(result)),
            //     )
            // })
        )

    @Effect()
    deleteBanner$ = (): Observable<Action> =>
        this.action$.pipe(
            ofType<BannerActions.DeleteBanner>(BannerActions.BannerActionTypes.DeleteBanner),
            switchMap(action => {
                return this.service.deleteBanner(action.payload).pipe(
                    map(result => new BannerActions.GetBannerList(action.options)),
                )
            })
        )
}
