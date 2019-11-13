import { Action } from '@ngrx/store';

export enum BannerActionTypes {
    GetBannerList = '[Banner] get list',
    GetBanner = '[Banner] get banner',
    UpdateBanner = '[Banner] update banner',
    CreateBanner = '[Banner] create banner',
    DeleteBanner = '[Banner] delete banner',
    GetBannerSuccess = '[Banner] get banner success',
    GetBannerListSuccess = '[Banner] get list success',
    EmptyState = '[Banner] empty state',
    SetSelectedBannerId = '[Banner] set selected banner id'
}

export class GetBannerList implements Action {
    readonly type = BannerActionTypes.GetBannerList;

    constructor(public payload: any, public options: any = {}) { }
}

export class GetBanner implements Action {
    readonly type = BannerActionTypes.GetBanner;

    constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class CreateBanner implements Action {
    readonly type = BannerActionTypes.CreateBanner;

    constructor(public payload: any, public options: any = {}) { }
}

export class UpdateBanner implements Action {
    readonly type = BannerActionTypes.UpdateBanner;

    constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class DeleteBanner implements Action {
    readonly type = BannerActionTypes.DeleteBanner;

    constructor(public payload: any, public options: any = {}) { }
}

export class GetBannerListSuccess implements Action {
    readonly type = BannerActionTypes.GetBannerListSuccess;

    constructor(public payload: any, public options: any = {}) { }
}

export class EmptyState implements Action {
    readonly type = BannerActionTypes.EmptyState;

    constructor() { }
}

export class SetSelectedBannerId implements Action {
    readonly type = BannerActionTypes.SetSelectedBannerId;

    constructor(public payload: any) { }
}

export class GetBannerSuccess implements Action {
    readonly type = BannerActionTypes.GetBannerSuccess;

    constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}
