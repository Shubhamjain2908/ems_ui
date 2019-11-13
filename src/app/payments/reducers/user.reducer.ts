import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserActions } from '../actions';

export interface User {
    id: number;
}

export interface State extends EntityState<User> {
    query: string;
    selectedUserId: number | null
    user: any;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (user: User) => user.id
});

export const initialState: State = adapter.getInitialState({
    query: '',
    selectedUserId: null,
    user: null
});

export function reducer(state: State = initialState, action: any) {
    switch (action.type) {
        case UserActions.UserActionTypes.GetUserListSuccess:
            return adapter.addMany(action.payload, adapter.removeAll(state));
        case UserActions.UserActionTypes.EmptyState:
            return adapter.removeAll({ ...state, user: null });
        default:
            return state;
    }
}
