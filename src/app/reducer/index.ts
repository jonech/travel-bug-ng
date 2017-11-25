import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer } from '../auth/auth.reducer';

export const reducers: ActionReducerMap<any> = {
  auth: AuthReducer
};
