import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BannerActions } from '../actions';

export interface Banner {
    id: number;
}

export interface State extends EntityState<Banner> {
    query: string;
    selectedBannerId: number | null
    banner: any;
}

export const adapter: EntityAdapter<Banner> = createEntityAdapter<Banner>({
    selectId: (banner: Banner) => banner.id
});

export const initialState: State = adapter.getInitialState({
    query: '',
    selectedBannerId: null,
    banner: null
});

export function reducer(state: State = initialState, action: any) {
    switch (action.type) {
        case BannerActions.BannerActionTypes.GetBannerListSuccess:
            return adapter.addMany(action.payload, adapter.removeAll(state));
        case BannerActions.BannerActionTypes.GetBannerSuccess:
            return { ...state, banner: action.payload };
        case BannerActions.BannerActionTypes.EmptyState:
            return adapter.removeAll({ ...state, banner: null });
        default:
            return state;
    }
}
