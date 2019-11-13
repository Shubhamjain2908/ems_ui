import { Action } from '@ngrx/store';

export enum CouponActionTypes {
  GetCouponList = '[Coupon] get list',
  GetCoupon = '[Coupon] get coupon',
  UpdateCoupon = '[Coupon] update coupon',
  CreateCoupon = '[Coupon] create coupon',
  DeleteCoupon = '[Coupon] delete coupon',
  GetCouponSuccess = '[Coupon] get coupon success',
  GetCouponListSuccess = '[Coupon] get list success',
  EmptyState = '[Coupon] empty state',
  SetSelectedCouponId = '[Coupon] set selected coupon id',
  GetCouponCodeSuggestion = '[Coupon] get code suggestion',
  GetCouponCodeSuggestionSuccess = '[Coupon] get code suggestion success',
}

export class GetCouponList implements Action {
  readonly type = CouponActionTypes.GetCouponList;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetCoupon implements Action {
  readonly type = CouponActionTypes.GetCoupon;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class CreateCoupon implements Action {
  readonly type = CouponActionTypes.CreateCoupon;

  constructor(public payload: any, public options: any = {}) { }
}

export class UpdateCoupon implements Action {
  readonly type = CouponActionTypes.UpdateCoupon;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class DeleteCoupon implements Action {
  readonly type = CouponActionTypes.DeleteCoupon;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetCouponListSuccess implements Action {
  readonly type = CouponActionTypes.GetCouponListSuccess;

  constructor(public payload: any, public options: any = {}) { }
}

export class EmptyState implements Action {
  readonly type = CouponActionTypes.EmptyState;

  constructor() { }
}

export class SetSelectedCouponId implements Action {
  readonly type = CouponActionTypes.SetSelectedCouponId;

  constructor(public payload: any) { }
}

export class GetCouponSuccess implements Action {
  readonly type = CouponActionTypes.GetCouponSuccess;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class GetCouponCodeSuggestion implements Action {
  readonly type = CouponActionTypes.GetCouponCodeSuggestion;

  constructor() { }
}

export class GetCouponCodeSuggestionSuccess implements Action {
  readonly type = CouponActionTypes.GetCouponCodeSuggestionSuccess;

  constructor(public payload: string) { }
}
