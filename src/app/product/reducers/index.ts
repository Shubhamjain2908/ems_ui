import * as fromProduct from './product.reducer';
import * as fromUser from './user.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    product: fromProduct.State,
    user: fromUser.State
}

export const reducers: ActionReducerMap<any> = {
    product: fromProduct.reducer,
    user: fromUser.reducer
};

export const getState = createFeatureSelector<State>('product');

export const getProductState = createSelector(
    getState,
    (state: State) => state.product
)

export const getUserState = createSelector(
    getState,
    (state: State) => state.user
)

export const {
    selectIds: getProductIds,
    selectEntities: getProductEntities,
    selectAll: getAllProducts,
    selectTotal: getTotalProducts,
} = fromProduct.adapter.getSelectors(getProductState);

export const getProduct = createSelector(
    getProductState,
    (state: fromProduct.State) => state.product
);

export const {
    selectIds: getUserIds,
    selectEntities: getUserEntities,
    selectAll: getAllUsers,
    selectTotal: getTotalUsers,
} = fromUser.adapter.getSelectors(getUserState);
