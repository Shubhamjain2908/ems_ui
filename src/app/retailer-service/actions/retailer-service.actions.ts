import { Action } from '@ngrx/store';

export enum RetailerServiceActionTypes {
  GetRetailerServiceList = '[RetailerService] get list',
  GetRetailerService = '[RetailerService] get category',
  UpdateRetailerService = '[RetailerService] update category',
  CreateRetailerService = '[RetailerService] create category',
  DeleteRetailerService = '[RetailerService] delete category',
  GetRetailerServiceSuccess = '[RetailerService] get category success',
  GetRetailerServiceListSuccess = '[RetailerService] get list success',
  EmptyState = '[RetailerService] empty state',
  SetSelectedRetailerServiceId = '[RetailerService] set selected category id',
  AddRetailerServiceImage = '[RetailerService] add retailer service image',
  AddRetailerServiceVariantImage = '[RetailerService] add retailer service variant image',
  PatchRetailerService = '[RetailerService] patch'
}

export class GetRetailerServiceList implements Action {
  readonly type = RetailerServiceActionTypes.GetRetailerServiceList;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetRetailerService implements Action {
  readonly type = RetailerServiceActionTypes.GetRetailerService;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class CreateRetailerService implements Action {
  readonly type = RetailerServiceActionTypes.CreateRetailerService;

  constructor(public payload: any, public options: any = {}) { }
}

export class UpdateRetailerService implements Action {
  readonly type = RetailerServiceActionTypes.UpdateRetailerService;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class DeleteRetailerService implements Action {
  readonly type = RetailerServiceActionTypes.DeleteRetailerService;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetRetailerServiceListSuccess implements Action {
  readonly type = RetailerServiceActionTypes.GetRetailerServiceListSuccess;

  constructor(public payload: any, public options: any = {}) { }
}

export class EmptyState implements Action {
  readonly type = RetailerServiceActionTypes.EmptyState;

  constructor() { }
}

export class SetSelectedRetailerServiceId implements Action {
  readonly type = RetailerServiceActionTypes.SetSelectedRetailerServiceId;

  constructor(public payload: any) { }
}

export class GetRetailerServiceSuccess implements Action {
  readonly type = RetailerServiceActionTypes.GetRetailerServiceSuccess;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class AddRetailerServiceImage implements Action {
  readonly type = RetailerServiceActionTypes.AddRetailerServiceImage;

  constructor(public serviceId: any, public data: any) { }
}

export class AddRetailerServiceVariantImage implements Action {
  readonly type = RetailerServiceActionTypes.AddRetailerServiceVariantImage;

  constructor(public serviceVariantId: any, public data: any, public options: any = {}) { }
}

export class PatchRetailerService implements Action {
  readonly type = RetailerServiceActionTypes.PatchRetailerService;

  constructor(public payload: any, public data: any, public options: any = {}) { }
}
