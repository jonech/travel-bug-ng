import { Action } from '@ngrx/store';

export const LOGIN = '[AUTH] Login';
export const LOGOUT = '[AUTH] Lougout';
export const REGISTER = '[AUTH] Register';
export const VALIDATE = '[AUTH] Validate';

export const AUTHENTICATED = '[AUTH] Authenticated';
export const NOT_AUTHENTICATED = '[AUTH] Not Authenticated';
export const AUTH_ERROR = '[AUTH] Error';
export const REGISTER_SUCCESS = '[AUTH] Register Success';

export class Login implements Action {
  readonly type: string = LOGIN;
  constructor(public payload?: any) {}
}

export class Validate implements Action {
  readonly type: string = VALIDATE;
  constructor(public payload?: any) {}
}

export class Authenticated implements Action {
  readonly type: string = AUTHENTICATED;
  constructor(public payload?: any) {}
}

export class NotAuthenticated implements Action {
  readonly type: string = NOT_AUTHENTICATED;
  constructor(public payload?: any) {}
}

export class AuthError implements Action {
  readonly type: string = AUTH_ERROR;
  constructor(public payload?: any) {}
}

export class Register implements Action {
  readonly type: string = REGISTER;
  constructor(public payload?: any) {}
}

export class RegisterSuccess implements Action {
  readonly type: string = REGISTER_SUCCESS;
  constructor(public payload?: any) {}
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
  constructor(public payload?: any) {}
}


export type All =
Login | Authenticated | NotAuthenticated |
Register | RegisterSuccess | AuthError |
Logout | Validate;

