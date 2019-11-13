import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OrderActions } from '../actions';

export interface Order {
  id: number;
}

export interface State extends EntityState<Order> {
  query: string;
  selectedOrderId: number | null
  order: any;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order: Order) => order.id
});

export const initialState: State = adapter.getInitialState({
  query: '',
  selectedOrderId: null,
  order: null
});

export function reducer(state: State = initialState, action: any) {
  switch (action.type) {
    case OrderActions.OrderActionTypes.GetOrderListSuccess:
      return adapter.addMany(action.payload, adapter.removeAll(state));
    case OrderActions.OrderActionTypes.GetOrderSuccess:
      return { ...state, order: action.payload };
    case OrderActions.OrderActionTypes.GetOrderLineSuccess:
      return { ...state };
    case OrderActions.OrderActionTypes.EmptyState:
      return adapter.removeAll({ ...state, order: null });
    case OrderActions.OrderActionTypes.AcceptOrderLine:
      return { ...state };
    case OrderActions.OrderActionTypes.DenyOrderLine:
      return { ...state };
    default:
      return state;
  }
}
