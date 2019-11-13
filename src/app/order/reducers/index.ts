import * as fromOrder from './order.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  order: fromOrder.State
}

export const reducers: ActionReducerMap<any> = {
  order: fromOrder.reducer
};

export const getState = createFeatureSelector<State>('order');

export const getOrderState = createSelector(
  getState,
  (state: State) => state.order
)

export const {
  selectIds: getOrderIds,
  selectEntities: getOrderEntities,
  selectAll: getAllOrders,
  selectTotal: getTotalOrders,
} = fromOrder.adapter.getSelectors(getOrderState);

export const getOrder = createSelector(
  getOrderState,
  (state: fromOrder.State) => state.order
);
