import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CollectionActions } from '../actions';

export interface Collection {
  id: number;
}

export interface State extends EntityState<Collection> {
  query: string;
  selectedCollectionId: number | null
  collection: any;
}

export const adapter: EntityAdapter<Collection> = createEntityAdapter<Collection>({
  selectId: (collection: Collection) => collection.id
});

export const initialState: State = adapter.getInitialState({
  query: '',
  selectedCollectionId: null,
  collection: null
});

export function reducer(state: State = initialState, action: any) {
  switch (action.type) {
    case CollectionActions.CollectionActionTypes.GetCollectionListSuccess:
      return adapter.addMany(action.payload, adapter.removeAll(state));
    case CollectionActions.CollectionActionTypes.GetCollectionSuccess:
      return { ...state, collection: action.payload };
    case CollectionActions.CollectionActionTypes.EmptyState:
      return adapter.removeAll({ ...state, collection: null });
    default:
      return state;
  }
}
