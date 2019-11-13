import { Action } from '@ngrx/store';

export enum CollectionActionTypes {
  GetCollectionList = '[Collection] get list',
  GetCollection = '[Collection] get category',
  UpdateCollection = '[Collection] update category',
  CreateCollection = '[Collection] create category',
  DeleteCollection = '[Collection] delete category',
  GetCollectionSuccess = '[Collection] get category success',
  GetCollectionListSuccess = '[Collection] get list success',
  EmptyState = '[Collection] empty state',
  SetSelectedCollectionId = '[Collection] set selected category id'
}

export class GetCollectionList implements Action {
  readonly type = CollectionActionTypes.GetCollectionList;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetCollection implements Action {
  readonly type = CollectionActionTypes.GetCollection;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class CreateCollection implements Action {
  readonly type = CollectionActionTypes.CreateCollection;

  constructor(public payload: any, public options: any = {}) { }
}

export class UpdateCollection implements Action {
  readonly type = CollectionActionTypes.UpdateCollection;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class DeleteCollection implements Action {
  readonly type = CollectionActionTypes.DeleteCollection;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetCollectionListSuccess implements Action {
  readonly type = CollectionActionTypes.GetCollectionListSuccess;

  constructor(public payload: any, public options: any = {}) { }
}

export class EmptyState implements Action {
  readonly type = CollectionActionTypes.EmptyState;

  constructor() { }
}

export class SetSelectedCollectionId implements Action {
  readonly type = CollectionActionTypes.SetSelectedCollectionId;

  constructor(public payload: any) { }
}

export class GetCollectionSuccess implements Action {
  readonly type = CollectionActionTypes.GetCollectionSuccess;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}
