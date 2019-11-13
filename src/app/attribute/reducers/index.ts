import * as fromAttribute from './attribute.reducer';
import * as fromAttributeChoice from './attribute-choice.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    attribute: fromAttribute.State;
    attributechoice: fromAttributeChoice.State;
}

export const reducers: ActionReducerMap<any> = {
    attribute: fromAttribute.reducer,
    attributechoice: fromAttributeChoice.reducer
};

export const getState = createFeatureSelector<State>('attribute');

export const getAttributeState = createSelector(
    getState,
    (state: State) => state.attribute
)

export const getAttributeChoiceState = createSelector(
    getState,
    (state: State) => state.attributechoice
)

export const {
    selectIds: getAttributeIds,
    selectEntities: getAttributeEntities,
    selectAll: getAllAttributes,
    selectTotal: getTotalAttributes,
} = fromAttribute.adapter.getSelectors(getAttributeState);

export const {
    selectIds: getAttributeChoiceIds,
    selectEntities: getAttributeChoiceEntities,
    selectAll: getAllAttributeChoices,
    selectTotal: getTotalAttributeChoices,
} = fromAttribute.adapter.getSelectors(getAttributeChoiceState);

export const getAttribute = createSelector(
    getAttributeState,
    (state: fromAttribute.State) => state.attribute
);

export const getAttributeChoice = createSelector(
    getAttributeChoiceState,
    (state: fromAttributeChoice.State) => state.attributeChoice
)
