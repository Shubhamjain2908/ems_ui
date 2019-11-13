import { Action } from '@ngrx/store';

export enum LoaderActionTypes {
    SetLoadingTrue = '[Loader] set true',
    SetLoadingFalse = '[Loader] set false',
    DisablePage = '[Loader] disable page',
    EnablePage = '[Loader] enable page'
}

export class SetLoadingTrue implements Action {
    readonly type = LoaderActionTypes.SetLoadingTrue;

    constructor() { }
}

export class SetLoadingFalse implements Action {
    readonly type = LoaderActionTypes.SetLoadingFalse;

    constructor() { }
}

export class DisablePage implements Action {
    readonly type = LoaderActionTypes.DisablePage;

    constructor() { }
}

export class EnablePage implements Action {
    readonly type = LoaderActionTypes.EnablePage;

    constructor() { }
}
