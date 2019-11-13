import * as fromBanner from './banner.reducer';
import * as fromOptions from './options.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    banner: fromBanner.State
    options: fromOptions.State
}

export const reducers: ActionReducerMap<any> = {
    banner: fromBanner.reducer,
    options: fromOptions.reducer
};

export const getState = createFeatureSelector<State>('banner');

export const getBannerState = createSelector(
    getState,
    (state: State) => state.banner
);

export const getOptionsState = createSelector(
    getState,
    (state: State) => state.options
);

export const {
    selectIds: getBannerIds,
    selectEntities: getBannerEntities,
    selectAll: getAllBanners,
    selectTotal: getTotalBanners,
} = fromBanner.adapter.getSelectors(getBannerState);


export const {
    selectIds: getOptionIds,
    selectEntities: getOptionEntities,
    selectAll: getAllOptions,
    selectTotal: getTotalOptions,
} = fromOptions.adapter.getSelectors(getOptionsState)

export const getBanner = createSelector(
    getBannerState,
    (state: fromBanner.State) => state.banner
);

export const getBannerOptions = createSelector(
    getAllOptions,
    (options: any[]) => options.map(c => {
        return {
            label: c.name,
            value: c.id
        }
    })
);
