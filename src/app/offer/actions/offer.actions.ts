import { Action } from '@ngrx/store';

export enum OfferActionTypes {
  GetOfferList = '[Offer] get list',
  GetOffer = '[Offer] get category',
  UpdateOffer = '[Offer] update category',
  CreateOffer = '[Offer] create category',
  DeleteOffer = '[Offer] delete category',
  GetOfferSuccess = '[Offer] get category success',
  GetOfferListSuccess = '[Offer] get list success',
  EmptyState = '[Offer] empty state',
  SetSelectedOfferId = '[Offer] set selected category id'
}

export class GetOfferList implements Action {
  readonly type = OfferActionTypes.GetOfferList;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetOffer implements Action {
  readonly type = OfferActionTypes.GetOffer;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class CreateOffer implements Action {
  readonly type = OfferActionTypes.CreateOffer;

  constructor(public payload: any, public options: any = {}) { }
}

export class UpdateOffer implements Action {
  readonly type = OfferActionTypes.UpdateOffer;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class DeleteOffer implements Action {
  readonly type = OfferActionTypes.DeleteOffer;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetOfferListSuccess implements Action {
  readonly type = OfferActionTypes.GetOfferListSuccess;

  constructor(public payload: any, public options: any = {}) { }
}

export class EmptyState implements Action {
  readonly type = OfferActionTypes.EmptyState;

  constructor() { }
}

export class SetSelectedOfferId implements Action {
  readonly type = OfferActionTypes.SetSelectedOfferId;

  constructor(public payload: any) { }
}

export class GetOfferSuccess implements Action {
  readonly type = OfferActionTypes.GetOfferSuccess;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}
