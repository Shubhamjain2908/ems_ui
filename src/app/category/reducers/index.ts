import * as fromCategory from './category.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    category: fromCategory.State
}

export const reducers: ActionReducerMap<any> = {
    category: fromCategory.reducer
};

export const getState = createFeatureSelector<State>('category');

export const getCategoryState = createSelector(
    getState,
    (state: State) => state.category
)

export const {
    selectIds: getCategoryIds,
    selectEntities: getCategoryEntities,
    selectAll: getAllCategories,
    selectTotal: getTotalCategories,
} = fromCategory.adapter.getSelectors(getCategoryState);

export const getCategory = createSelector(
    getCategoryState,
    (state: fromCategory.State) => state.category
);

export const getCategoryOptions = createSelector(
    getAllCategories,
    (categories: any[]) => categories.map(c => {
        return {
            label: c.name,
            value: c.id
        }
    })
);
