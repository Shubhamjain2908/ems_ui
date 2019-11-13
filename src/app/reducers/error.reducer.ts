import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ErrorActions } from 'app/shared/actions';

export interface State {
  error: any;
}

export const initialState: State = {
  error: ''
};

export function reducer(state: State = initialState, action: any) {
  switch (action.type) {
    case ErrorActions.ErrorActionType.SetError:
      return { error: action.payload };
    case ErrorActions.ErrorActionType.RemoveError:
      return { error: '' };
    default:
      return state;
  }
}
