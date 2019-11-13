import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TagActions } from 'app/shared/actions';

export interface Tag {
  id: number;
}

export interface State extends EntityState<Tag> {
  query: string;
  selectedTagId: number | null
  tag: any;
}

export const adapter: EntityAdapter<Tag> = createEntityAdapter<Tag>({
  selectId: (tag: Tag) => tag.id
});

export const initialState: State = adapter.getInitialState({
  query: '',
  selectedTagId: null,
  tag: null
});

export function reducer(state: State = initialState, action: any) {
  switch (action.type) {
    case TagActions.TagActionTypes.GetTagListSuccess:
      return adapter.addMany(action.payload, adapter.removeAll(state));
    case TagActions.TagActionTypes.GetTagSuccess:
      return { ...state, tag: action.payload };
    case TagActions.TagActionTypes.EmptyState:
      return adapter.removeAll({ ...state, tag: null });
    default:
      return state;
  }
}
