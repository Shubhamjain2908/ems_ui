import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OfferActions } from '../actions';

export interface Offer {
  id: number;
}

export interface State extends EntityState<Offer> {
  query: string;
  selectedOfferId: number | null
  offer: any;
}

export const adapter: EntityAdapter<Offer> = createEntityAdapter<Offer>({
  selectId: (offer: Offer) => offer.id
});

export const initialState: State = adapter.getInitialState({
  query: '',
  selectedOfferId: null,
  offer: null
});

export function reducer(state: State = initialState, action: any) {
  switch (action.type) {
    case OfferActions.OfferActionTypes.GetOfferListSuccess:
      return adapter.addMany(action.payload, adapter.removeAll(state));
    case OfferActions.OfferActionTypes.GetOfferSuccess:
      return { ...state, offer: action.payload };
    case OfferActions.OfferActionTypes.EmptyState:
      return adapter.removeAll({ ...state, offer: null });
    default:
      return state;
  }
}
