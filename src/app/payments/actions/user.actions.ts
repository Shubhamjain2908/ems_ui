import { Action } from '@ngrx/store';

export enum UserActionTypes {
    GetUserList = '[User] get list',
    GetUserListSuccess = '[User] get list success',
    EmptyState = '[User] empty state',
    SetSelectedUserId = '[User] set selected category id'
}

export class GetUserList implements Action {
    readonly type = UserActionTypes.GetUserList;

    constructor(public payload: any, public options: any = {}) { }
}

export class GetUserListSuccess implements Action {
    readonly type = UserActionTypes.GetUserListSuccess;

    constructor(public payload: any, public options: any = {}) { }
}

export class EmptyState implements Action {
    readonly type = UserActionTypes.EmptyState;

    constructor() { }
}

export class SetSelectedUserId implements Action {
    readonly type = UserActionTypes.SetSelectedUserId;

    constructor(public payload: any) { }
}
