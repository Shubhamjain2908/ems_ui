import { Action } from '@ngrx/store';
import { LoaderActions } from 'app/shared/actions';

export interface State {
    isLoading: boolean
    disablePage: boolean
}

export const initialState: State = {
    isLoading: false,
    disablePage: false
};

export function reducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case LoaderActions.LoaderActionTypes.SetLoadingTrue:
            return { ...state, isLoading: true };
        case LoaderActions.LoaderActionTypes.SetLoadingFalse:
            return { ...state, isLoading: false };
        case LoaderActions.LoaderActionTypes.DisablePage:
            return { ...state, disablePage: true };
        case LoaderActions.LoaderActionTypes.EnablePage:
            return { ...state, disablePage: false };
        default:
            return state
    }
}
