import * as fromPayments from './payments.reducer';
import * as fromUser from './user.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  payments: fromPayments.State,
  user: fromUser.State
}

export const reducers: ActionReducerMap<any> = {
  payments: fromPayments.reducer,
  user: fromUser.reducer
};

export const getState = createFeatureSelector<State>('payments');

export const getPaymentsState = createSelector(
  getState,
  (state: State) => state.payments
)

export const getUserState = createSelector(
  getState,
  (state: State) => state.user
)

export const {
  selectIds: getPaymentsIds,
  selectEntities: getPaymentsEntities,
  selectAll: getAllPayments,
  selectTotal: getTotalPayments,
} = fromPayments.adapter.getSelectors(getPaymentsState);

export const getPayments = createSelector(
  getPaymentsState,
  (state: fromPayments.State) => state.payments
);

export const {
  selectIds: getUserIds,
  selectEntities: getUserEntities,
  selectAll: getAllUsers,
  selectTotal: getTotalUsers,
} = fromUser.adapter.getSelectors(getUserState);
