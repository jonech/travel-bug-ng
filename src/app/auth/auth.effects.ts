import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { User } from '../_model/user.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

import { AuthService } from '../_service/auth.service';
import * as AuthAction from './auth.actions';
export type Action = AuthAction.All;

@Injectable()
export class AuthEffect {

  constructor(private actions: Actions, private authService: AuthService) {}

  @Effect()
  validate: Observable<Action> = this.actions.ofType(AuthAction.VALIDATE)
    .map((action: AuthAction.Logout) => action.payload)
    .switchMap(payload => {
      return this.authService.validateJWT();
    })
    .map(authData => {
      if (authData) {
        return new AuthAction.Authenticated({ isLogin: true });
      }
      return new AuthAction.NotAuthenticated({isLogin: false});
    })
    .catch(err => Observable.of(new AuthAction.AuthError({ error: err.message })));

  @Effect()
  login: Observable<Action> = this.actions.ofType(AuthAction.LOGIN)
    .map((action: AuthAction.Login) => action.payload)
    .switchMap(payload => this.authService.loginWithEmail(payload.email, payload.password))
    .map(authData => {
      if (authData) {
        return new AuthAction.Authenticated({ isLogin: true });
      }
      else {
        return new AuthAction.NotAuthenticated({isLogin: false});
      }
    })
    .catch(err => Observable.of(new AuthAction.AuthError({error: err})));

  @Effect()
  logout: Observable<Action> = this.actions.ofType(AuthAction.LOGOUT)
    .map((action: AuthAction.Logout) => action.payload)
    .switchMap(payload => {
      return Observable.of(this.authService.logout());
    })
    .map(authData => {
      return new AuthAction.NotAuthenticated({isLogin: false});
    })
    .catch(err => Observable.of(new AuthAction.AuthError({ error: err.message })));

}
