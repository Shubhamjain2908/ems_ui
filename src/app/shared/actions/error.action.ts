import { Action } from '@ngrx/store';

export enum ErrorActionType {
    RemoveError = '[Error] remove error',
    SetError = '[Error] set error'
}


export class SetError implements Action {
    readonly type = ErrorActionType.SetError;

    constructor(public payload: any) { }
}

export class RemoveError implements Action {
    readonly type = ErrorActionType.RemoveError;

    constructor() { }
}
