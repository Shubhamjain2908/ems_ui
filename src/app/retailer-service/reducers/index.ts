import * as fromRetailerService from './retailer-service.reducer';
import * as fromUser from './user.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  service: fromRetailerService.State,
  user: fromUser.State
}

export const reducers: ActionReducerMap<any> = {
  service: fromRetailerService.reducer,
  user: fromUser.reducer
};

export const getState = createFeatureSelector<State>('retailer-service');

export const getRetailerServiceState = createSelector(
  getState,
  (state: State) => state.service
)

export const getUserState = createSelector(
  getState,
  (state: State) => state.user
)

export const {
  selectIds: getRetailerServiceIds,
  selectEntities: getRetailerServiceEntities,
  selectAll: getAllRetailerServices,
  selectTotal: getTotalRetailerServices,
} = fromRetailerService.adapter.getSelectors(getRetailerServiceState);

export const getRetailerService = createSelector(
  getRetailerServiceState,
  (state: fromRetailerService.State) => state.retailerService
);

export const {
  selectIds: getUserIds,
  selectEntities: getUserEntities,
  selectAll: getAllUsers,
  selectTotal: getTotalUsers,
} = fromUser.adapter.getSelectors(getUserState);
