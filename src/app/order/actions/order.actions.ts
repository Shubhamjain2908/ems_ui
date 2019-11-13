import { Action } from '@ngrx/store';

export enum OrderActionTypes {
  GetOrderList = '[Order] get list',
  GetOrder = '[Order] get order',
  AcceptOrderLine = '[Order] accept order line',
  DenyOrderLine = '[Order] deny order line',
  // UpdateOrder = '[Order] update order',
  // CreateOrder = '[Order] create order',
  // DeleteOrder = '[Order] delete order',
  GetOrderSuccess = '[Order] get order success',
  GetOrderLineSuccess = '[Order] get order line success',
  GetOrderListSuccess = '[Order] get list success',
  EmptyState = '[Order] empty state',
  SetSelectedOrderId = '[Order] set selected order id'
}

export class GetOrderList implements Action {
  readonly type = OrderActionTypes.GetOrderList;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetOrder implements Action {
  readonly type = OrderActionTypes.GetOrder;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

// export class CreateOrder implements Action {
//     readonly type = OrderActionTypes.CreateOrder;

//     constructor(public payload: any, public options: any = {}) { }
// }

// export class UpdateOrder implements Action {
//     readonly type = OrderActionTypes.UpdateOrder;

//     constructor(public payload: any, public data: any = {}, public options: any = {}) { }
// }

// export class DeleteOrder implements Action {
//     readonly type = OrderActionTypes.DeleteOrder;

//     constructor(public payload: any, public options: any = {}) { }
// }

export class GetOrderListSuccess implements Action {
  readonly type = OrderActionTypes.GetOrderListSuccess;

  constructor(public payload: any, public options: any = {}) { }
}

export class EmptyState implements Action {
  readonly type = OrderActionTypes.EmptyState;

  constructor() { }
}

export class SetSelectedOrderId implements Action {
  readonly type = OrderActionTypes.SetSelectedOrderId;

  constructor(public payload: any) { }
}


export class AcceptOrderLine implements Action {
  readonly type = OrderActionTypes.AcceptOrderLine;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class DenyOrderLine implements Action {
  readonly type = OrderActionTypes.DenyOrderLine;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class GetOrderSuccess implements Action {
  readonly type = OrderActionTypes.GetOrderSuccess;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}


export class GetOrderLineSuccess implements Action {
  readonly type = OrderActionTypes.GetOrderSuccess;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}
