import { Action } from '@ngrx/store';

export enum OptionsActionTypes {
    GetCategoryList = '[Options] get list',
    GetOptionsListSuccess = '[Options] get options',
    EmptyState = '[Options] empty state',
}

export class GetCategoryList implements Action {
    readonly type = OptionsActionTypes.GetCategoryList;

    constructor(public payload: any, public options: any = {}) { }
}

export class GetOptionsListSuccess implements Action {
    readonly type = OptionsActionTypes.GetOptionsListSuccess;

    constructor(public payload: any, public options: any = {}) { }
}


export class EmptyState implements Action {
    readonly type = OptionsActionTypes.EmptyState;

    constructor() { }
}
