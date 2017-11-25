import { Auth } from '../_model/auth.model';

import * as AuthActions from '../action/auth.actions';
export type Action = AuthActions.All;


// helper function to create new state obj
const newState = (state, newData) => {
  return Object.assign({}, state, newData)
}

const defaultAuth: Auth = {
  error: null,
  jwt: null,
  isLogin: false
};

// reducer function
export function AuthReducer(state: Auth = defaultAuth, action: Action) {
  console.log(action.type, state)

  switch (action.type) {
    case AuthActions.LOGIN:
      return { ...state, loading: true};

    case AuthActions.AUTHENTICATED:
      return { ...state, ...action.payload, loading: false };

    case AuthActions.NOT_AUTHENTICATED:
      return { ...state, ...action.payload, loading: false };

    case AuthActions.REGISTER:
      return { ...state, loading: true };

    case AuthActions.REGISTER_SUCCESS:
      return { ...state, ...action.payload, loading: false };

    case AuthActions.AUTH_ERROR:
      return { ...state, ...action.payload, loading: false };

    case AuthActions.LOGOUT:
      return { ...state, ...action.payload, loading: true };

    case AuthActions.VALIDATE:
      return{ ...state, ...action.payload };

    default:
      return state;
  }
}
