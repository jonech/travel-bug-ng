import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer } from './auth.reducer';

export const reducers: ActionReducerMap<any> = {
  auth: AuthReducer
};
