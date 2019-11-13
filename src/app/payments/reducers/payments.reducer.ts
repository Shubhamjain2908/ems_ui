import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PaymentsActions } from '../actions';

export interface Payments {
  id: number;
}

export interface State extends EntityState<Payments> {
  query: string;
  selectedPaymentsId: number | null
  payments: any;
}

export const adapter: EntityAdapter<Payments> = createEntityAdapter<Payments>({
  selectId: (payments: Payments) => payments.id
});

export const initialState: State = adapter.getInitialState({
  query: '',
  selectedPaymentsId: null,
  payments: null
});

export function reducer(state: State = initialState, action: any) {
  switch (action.type) {
    case PaymentsActions.PaymentsActionTypes.GetPaymentsListSuccess:
      return adapter.addMany(action.payload, adapter.removeAll(state));
    case PaymentsActions.PaymentsActionTypes.GetPaymentsSuccess:
      return { ...state, payments: action.payload };
    case PaymentsActions.PaymentsActionTypes.EmptyState:
      return adapter.removeAll({ ...state, payments: null });
    default:
      return state;
  }
}
