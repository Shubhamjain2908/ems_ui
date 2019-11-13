import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CouponActions } from '../actions';

export interface Coupon {
  id: number;
}

export interface State extends EntityState<Coupon> {
  query: string;
  selectedCouponId: number | null
  coupon: any;
  codeSuggestion: string;
}

export const adapter: EntityAdapter<Coupon> = createEntityAdapter<Coupon>({
  selectId: (coupon: Coupon) => coupon.id
});

export const initialState: State = adapter.getInitialState({
  query: '',
  selectedCouponId: null,
  coupon: null,
  codeSuggestion: ''
});

export function reducer(state: State = initialState, action: any) {
  switch (action.type) {
    case CouponActions.CouponActionTypes.GetCouponListSuccess:
      return adapter.addMany(action.payload, adapter.removeAll(state));
    case CouponActions.CouponActionTypes.GetCouponSuccess:
      return { ...state, coupon: action.payload };
    case CouponActions.CouponActionTypes.EmptyState:
      return adapter.removeAll({ ...state, coupon: null });
    case CouponActions.CouponActionTypes.GetCouponCodeSuggestionSuccess:
      return { ...state, codeSuggestion: action.payload };
    default:
      return state;
  }
}
