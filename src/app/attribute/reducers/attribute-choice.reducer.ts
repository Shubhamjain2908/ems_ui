import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AttributeActions } from '../actions';

export interface AttributeChoice {
    id: number;
}

export interface State extends EntityState<AttributeChoice> {
    query: string;
    selectedAttributeChoiceId: number | null
    attributeChoice: any;
}

export const adapter: EntityAdapter<AttributeChoice> = createEntityAdapter<AttributeChoice>({
    selectId: (attributeChoice: AttributeChoice) => attributeChoice.id
});

export const initialState: State = adapter.getInitialState({
    query: '',
    selectedAttributeChoiceId: null,
    attributeChoice: null
});

export function reducer(state: State = initialState, action: any) {
    switch (action.type) {
        case AttributeActions.AttributeActionTypes.GetAttributeChoiceListSuccess:
            return adapter.addMany(action.payload, adapter.removeAll(state));
        case AttributeActions.AttributeActionTypes.GetAttributeChoiceSuccess:
            return { ...state, attributeChoice: action.payload };
        case AttributeActions.AttributeActionTypes.EmptyState:
            return adapter.removeAll({ ...state, attributeChoice: null });
        default:
            return state;
    }
}
