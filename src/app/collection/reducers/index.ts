import * as fromCollection from './collection.reducer';
import * as fromProduct from './product.reducer';
import * as fromUser from './user.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  collection: fromCollection.State;
  product: fromProduct.State;
  user: fromProduct.State;
}

export const reducers: ActionReducerMap<any> = {
  collection: fromCollection.reducer,
  product: fromProduct.reducer,
  user: fromUser.reducer
};

export const getState = createFeatureSelector<State>('collection');

export const getCollectionState = createSelector(
  getState,
  (state: State) => state.collection
)

export const getProductState = createSelector(
  getState,
  (state: State) => state.product
)

export const getUserState = createSelector(
  getState,
  (state: State) => state.user
)

export const {
  selectIds: getCollectionIds,
  selectEntities: getCollectionEntities,
  selectAll: getAllCollections,
  selectTotal: getTotalCollections,
} = fromCollection.adapter.getSelectors(getCollectionState);

export const {
  selectIds: getProductIds,
  selectEntities: getProductEntities,
  selectAll: getAllProducts,
  selectTotal: getTotalProducts,
} = fromProduct.adapter.getSelectors(getProductState);

export const {
  selectIds: getUserIds,
  selectEntities: getUserEntities,
  selectAll: getAllUsers,
  selectTotal: getTotalUsers,
} = fromUser.adapter.getSelectors(getUserState);

export const getCollection = createSelector(
  getCollectionState,
  (state: fromCollection.State) => state.collection
);
