import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AttributeActions } from '../actions';

export interface Attribute {
  id: number;
}

export interface State extends EntityState<Attribute> {
  query: string;
  selectedAttributeId: number | null
  attribute: any;
}

export const adapter: EntityAdapter<Attribute> = createEntityAdapter<Attribute>({
  selectId: (attribute: Attribute) => attribute.id
});

export const initialState: State = adapter.getInitialState({
  query: '',
  selectedAttributeId: null,
  attribute: null
});

export function reducer(state: State = initialState, action: any) {
  switch (action.type) {
    case AttributeActions.AttributeActionTypes.GetAttributeListSuccess:
      return adapter.addMany(action.payload, adapter.removeAll(state));
    case AttributeActions.AttributeActionTypes.EmptyState:
      return adapter.removeAll({ ...state, attribute: null });
    case AttributeActions.AttributeActionTypes.GetAttributeSuccess:
      return { ...state, attribute: action.payload };
    default:
      return state;
  }
}
