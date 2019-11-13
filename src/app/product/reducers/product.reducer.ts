import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ProductActions } from '../actions';

export interface Product {
    id: number;
}

export interface State extends EntityState<Product> {
    query: string;
    selectedProductId: number | null
    product: any;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
    selectId: (product: Product) => product.id
});

export const initialState: State = adapter.getInitialState({
    query: '',
    selectedProductId: null,
    product: null
});

export function reducer(state: State = initialState, action: any) {
    switch (action.type) {
        case ProductActions.ProductActionTypes.GetProductListSuccess:
            return adapter.addMany(action.payload, adapter.removeAll(state));
        case ProductActions.ProductActionTypes.GetProductSuccess:
            return { ...state, product: action.payload };
        case ProductActions.ProductActionTypes.EmptyState:
            return adapter.removeAll({ ...state, product: null });
        default:
            return state;
    }
}
