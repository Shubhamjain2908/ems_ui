import * as fromCoupon from './coupon.reducer';
import * as fromCollection from './../../collection/reducers/collection.reducer';
import * as fromProduct from './../../product/reducers/product.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  coupon: fromCoupon.State;
  product: fromProduct.State;
  collection: fromCollection.State;
}

export const reducers: ActionReducerMap<any> = {
  coupon: fromCoupon.reducer,
  product: fromProduct.reducer,
  collection: fromCollection.reducer
};

export const getState = createFeatureSelector<State>('coupon');

export const getCouponState = createSelector(
  getState,
  (state: State) => state.coupon
)

export const getCollectionState = createSelector(
  getState,
  (state: State) => state.collection
)

export const getProductState = createSelector(
  getState,
  (state: State) => state.product
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
  selectIds: getCouponIds,
  selectEntities: getCouponEntities,
  selectAll: getAllCoupons,
  selectTotal: getTotalCoupons,
} = fromCoupon.adapter.getSelectors(getCouponState);

export const getCoupon = createSelector(
  getCouponState,
  (state: fromCoupon.State) => state.coupon
);

export const getCodeSuggestion = createSelector(
  getCouponState,
  (state: fromCoupon.State) => state.codeSuggestion
);
