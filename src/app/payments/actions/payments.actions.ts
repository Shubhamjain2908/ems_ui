import { Action } from '@ngrx/store';

export enum PaymentsActionTypes {
  GetPaymentsList = '[Payments] get list',
  GetPayments = '[Payments] get category',
  GetPaymentsSuccess = '[Payments] get category success',
  GetPaymentsListSuccess = '[Payments] get list success',
  EmptyState = '[Payments] empty state',
  SetSelectedPaymentsId = '[Payments] set selected category id',
}

export class GetPaymentsList implements Action {
  readonly type = PaymentsActionTypes.GetPaymentsList;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetPayments implements Action {
  readonly type = PaymentsActionTypes.GetPayments;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}


export class GetPaymentsListSuccess implements Action {
  readonly type = PaymentsActionTypes.GetPaymentsListSuccess;

  constructor(public payload: any, public options: any = {}) { }
}

export class EmptyState implements Action {
  readonly type = PaymentsActionTypes.EmptyState;

  constructor() { }
}

export class SetSelectedPaymentsId implements Action {
  readonly type = PaymentsActionTypes.SetSelectedPaymentsId;

  constructor(public payload: any) { }
}

export class GetPaymentsSuccess implements Action {
  readonly type = PaymentsActionTypes.GetPaymentsSuccess;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

