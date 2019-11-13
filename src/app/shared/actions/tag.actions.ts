import { Action } from '@ngrx/store';

export enum TagActionTypes {
  GetTagList = '[Tag] get list',
  GetTag = '[Tag] get tag',
  UpdateTag = '[Tag] update tag',
  CreateTag = '[Tag] create tag',
  DeleteTag = '[Tag] delete tag',
  GetTagSuccess = '[Tag] get tag success',
  GetTagListSuccess = '[Tag] get list success',
  EmptyState = '[Tag] empty state',
  SetSelectedTagId = '[Tag] set selected tag id',
}

export class GetTagList implements Action {
  readonly type = TagActionTypes.GetTagList;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetTag implements Action {
  readonly type = TagActionTypes.GetTag;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class CreateTag implements Action {
  readonly type = TagActionTypes.CreateTag;

  constructor(public payload: any, public options: any = {}) { }
}

export class UpdateTag implements Action {
  readonly type = TagActionTypes.UpdateTag;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class DeleteTag implements Action {
  readonly type = TagActionTypes.DeleteTag;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetTagListSuccess implements Action {
  readonly type = TagActionTypes.GetTagListSuccess;

  constructor(public payload: any, public options: any = {}) { }
}

export class EmptyState implements Action {
  readonly type = TagActionTypes.EmptyState;

  constructor() { }
}

export class SetSelectedTagId implements Action {
  readonly type = TagActionTypes.SetSelectedTagId;

  constructor(public payload: any) { }
}

export class GetTagSuccess implements Action {
  readonly type = TagActionTypes.GetTagSuccess;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}
