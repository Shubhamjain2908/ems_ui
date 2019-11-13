import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OptionsActions } from '../actions';

export interface Options {
    id: number;
}

export interface State extends EntityState<Options> {
    query: string;
    selectedOptionsId: number | null
    banner: any;
}

export const adapter: EntityAdapter<Options> = createEntityAdapter<Options>({
    selectId: (banner: Options) => banner.id
});

export const initialState: State = adapter.getInitialState({
    query: '',
    selectedOptionsId: null,
    banner: null
});

export function reducer(state: State = initialState, action: any) {
    switch (action.type) {
        case OptionsActions.OptionsActionTypes.GetOptionsListSuccess:
            return adapter.addMany(action.payload, adapter.removeAll(state));
        case OptionsActions.OptionsActionTypes.EmptyState:
            return adapter.removeAll({ ...state, banner: null });
        default:
            return state;
    }
}
