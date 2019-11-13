import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormActions } from 'app/shared/actions';

export interface State {
  isLoading: boolean;
  showSuccess: boolean;
  showFailure: boolean;
}

export const initialState: State = {
  isLoading: false,
  showFailure: false,
  showSuccess: false
};

export function reducer(state: State = initialState, action: any) {
  switch (action.type) {
    case FormActions.FormActionType.SetFailureTrue:
      return { ...state, showFailure: true, showSuccess: false, isLoading: false };
    case FormActions.FormActionType.SetSuccessTrue:
      return { ...state, showFailure: false, showSuccess: true, isLoading: false };
    case FormActions.FormActionType.SetLoadingTrue:
      return { ...state, showFailure: false, showSuccess: false, isLoading: true };
    case FormActions.FormActionType.SetLoadingFalse:
      return { ...state, isLoading: false };
    case FormActions.FormActionType.InitializeState:
      return initialState;
    default:
      return state;
  }
}
