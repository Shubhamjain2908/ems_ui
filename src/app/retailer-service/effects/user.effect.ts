import { Injectable } from '@angular/core';
import { RetailerServiceService } from '../retailer-service.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserActions } from '../actions';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserEffect {
  constructor(private action$: Actions, private service: RetailerServiceService) { }

  @Effect()
  getUserList$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<UserActions.GetUserList>(UserActions.UserActionTypes.GetUserList),
      map(action => action.payload),
      switchMap(data => {
        return this.service.getUserList(data).pipe(
          map(result => new UserActions.GetUserListSuccess(result))
        )
      })
    )
}
