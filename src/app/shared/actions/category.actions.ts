import { Action } from '@ngrx/store';

export enum CategoryActionTypes {
    GetCategoryList = '[Category] get list',
    GetCategory = '[Category] get category',
    UpdateCategory = '[Category] update category',
    CreateCategory = '[Category] create category',
    DeleteCategory = '[Category] delete category',
    GetCategorySuccess = '[Category] get category success',
    GetCategoryListSuccess = '[Category] get list success',
    EmptyState = '[Category] empty state',
    SetSelectedCategoryId = '[Category] set selected category id',
    GetVariantAttributes = '[Category] get variant attributes',
    GetVariantAttributesSuccess = '[Category] get variant attributes success',
}

export class GetCategoryList implements Action {
    readonly type = CategoryActionTypes.GetCategoryList;

    constructor(public payload: any, public options: any = {}) { }
}

export class GetCategory implements Action {
    readonly type = CategoryActionTypes.GetCategory;

    constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class CreateCategory implements Action {
    readonly type = CategoryActionTypes.CreateCategory;

    constructor(public payload: any, public options: any = {}) { }
}

export class UpdateCategory implements Action {
    readonly type = CategoryActionTypes.UpdateCategory;

    constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class DeleteCategory implements Action {
    readonly type = CategoryActionTypes.DeleteCategory;

    constructor(public payload: any, public options: any = {}) { }
}

export class GetCategoryListSuccess implements Action {
    readonly type = CategoryActionTypes.GetCategoryListSuccess;

    constructor(public payload: any, public options: any = {}) { }
}

export class EmptyState implements Action {
    readonly type = CategoryActionTypes.EmptyState;

    constructor() { }
}

export class SetSelectedCategoryId implements Action {
    readonly type = CategoryActionTypes.SetSelectedCategoryId;

    constructor(public payload: any) { }
}

export class GetCategorySuccess implements Action {
    readonly type = CategoryActionTypes.GetCategorySuccess;

    constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class GetVariantAttributes implements Action {
    readonly type = CategoryActionTypes.GetVariantAttributes;

    constructor(public payload: any) { }
}

export class GetVariantAttributesSuccess implements Action {
    readonly type = CategoryActionTypes.GetVariantAttributesSuccess;

    constructor(public payload: any) { }
}
