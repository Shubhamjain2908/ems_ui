import * as fromOffer from './offer.reducer';
import * as fromCollection from './../../collection/reducers/collection.reducer';
import * as fromProduct from './../../product/reducers/product.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  offer: fromOffer.State;
  product: fromProduct.State;
  collection: fromCollection.State;
}

export const reducers: ActionReducerMap<any> = {
  offer: fromOffer.reducer,
  product: fromProduct.reducer,
  collection: fromCollection.reducer
};

export const getState = createFeatureSelector<State>('offer');

export const getOfferState = createSelector(
  getState,
  (state: State) => state.offer
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
  selectIds: getOfferIds,
  selectEntities: getOfferEntities,
  selectAll: getAllOffers,
  selectTotal: getTotalOffers,
} = fromOffer.adapter.getSelectors(getOfferState);

export const getOffer = createSelector(
  getOfferState,
  (state: fromOffer.State) => state.offer
);
