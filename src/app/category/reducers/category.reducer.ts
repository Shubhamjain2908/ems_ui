import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CategoryActions } from '../actions';

export interface Category {
    id: number;
}

export interface State extends EntityState<Category> {
    query: string;
    selectedCategoryId: number | null
    category: any;
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
    selectId: (category: Category) => category.id
});

export const initialState: State = adapter.getInitialState({
    query: '',
    selectedCategoryId: null,
    category: null
});

export function reducer(state: State = initialState, action: any) {
    switch (action.type) {
        case CategoryActions.CategoryActionTypes.GetCategoryListSuccess:
            return adapter.addMany(action.payload, adapter.removeAll(state));
        case CategoryActions.CategoryActionTypes.GetCategorySuccess:
            return { ...state, category: action.payload };
        case CategoryActions.CategoryActionTypes.EmptyState:
            return adapter.removeAll({ ...state, category: null });
        default:
            return state;
    }
}
