import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { RetailerServiceActions } from '../actions';

export interface RetailerService {
  id: number;
}

export interface State extends EntityState<RetailerService> {
  query: string;
  selectedRetailerServiceId: number | null
  retailerService: any;
}

export const adapter: EntityAdapter<RetailerService> = createEntityAdapter<RetailerService>({
  selectId: (retailerService: RetailerService) => retailerService.id
});

export const initialState: State = adapter.getInitialState({
  query: '',
  selectedRetailerServiceId: null,
  retailerService: null
});

export function reducer(state: State = initialState, action: any) {
  switch (action.type) {
    case RetailerServiceActions.RetailerServiceActionTypes.GetRetailerServiceListSuccess:
      return adapter.addMany(action.payload, adapter.removeAll(state));
    case RetailerServiceActions.RetailerServiceActionTypes.GetRetailerServiceSuccess:
      return { ...state, retailerService: action.payload };
    case RetailerServiceActions.RetailerServiceActionTypes.EmptyState:
      return adapter.removeAll({ ...state, retailerService: null });
    default:
      return state;
  }
}
