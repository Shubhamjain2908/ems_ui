import * as fromLoader from './loader.reducer';
import * as fromCategory from './category.reducer';
import * as fromForm from './form.reducer';
import * as fromError from './error.reducer';
import * as fromTag from './tag.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { FormControl } from '@angular/forms';

export interface State {
  loader: fromLoader.State;
  category: fromCategory.State,
  error: fromError.State;
  form: fromForm.State;
  tag: fromTag.State;
}

export const reducers: ActionReducerMap<any> = {
  loader: fromLoader.reducer,
  category: fromCategory.reducer,
  error: fromError.reducer,
  form: fromForm.reducer,
  tag: fromTag.reducer
};

export const getLoaderState = createFeatureSelector<fromLoader.State>('loader');
export const getCategoryState = createFeatureSelector<fromCategory.State>('category');
export const getErrorState = createFeatureSelector<fromError.State>('error');
export const getFormState = createFeatureSelector<fromForm.State>('form');
export const getTagState = createFeatureSelector<fromTag.State>('tag');

export const getLoadingStatus = createSelector(
  getLoaderState,
  (state: fromLoader.State) => state.isLoading
);

export const pageDisabled = createSelector(
  getLoaderState,
  (state: fromLoader.State) => state.disablePage
);

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

export const getVariantAttributes = createSelector(
  getCategoryState,
  (state: fromCategory.State) => state.attributes
)

export const getVariantFormObject = createSelector(
  getVariantAttributes,
  (attributes: any[]) => {
    const obj = {};
    attributes.forEach(a => obj[a.name.toLowerCase()] = new FormControl([]))
    return obj;
  }
);

export const getIsLoading = createSelector(
  getFormState,
  (state: fromForm.State) => state.isLoading
);

export const getSuccess = createSelector(
  getFormState,
  (state: fromForm.State) => state.showSuccess
);

export const getFailure = createSelector(
  getFormState,
  (state: fromForm.State) => state.showFailure
);

export const getError = createSelector(
  getErrorState,
  (state: fromError.State) => state.error
);

export const {
  selectIds: getTagIds,
  selectEntities: getTagEntities,
  selectAll: getAllTags,
  selectTotal: getTotalTags,
} = fromTag.adapter.getSelectors(getTagState);

export const getTag = createSelector(
  getTagState,
  (state: fromTag.State) => state.tag
);
