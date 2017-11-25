import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
//import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../_service/auth.service';
import * as AuthAction from '../auth.actions';
import { Auth } from '../../_model/auth.model';

interface AppState {
  auth: Auth;
}

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit
{
	_redirect: string;
	_error: string;

	constructor
	(
		//private _afAuth:AngularFireAuth,
		private _router:Router,
    private _route: ActivatedRoute,
    private store: Store<AppState>,
		private authService: AuthService
	){}

	ngOnInit()
	{
		this._route.params.subscribe(params => {
			this.handleRedirectMsg(params['redirect']);
		});
	}

	LoginWithEmail(emailEl:any, passwordEl:any)
	{
    // this.authService.loginWithEmail(emailEl.value, passwordEl.value)
    //   .subscribe((res) => {
    //     if (res) this.ToDashboard();
    //   }, (err) => {
    //     //TODO: prompt user
    //     console.log(err);
    //   });
    this.store.dispatch(new AuthAction.Login({email: emailEl.value, password: passwordEl.value }));
    this.store.subscribe(state => {
      console.log('login', state);
      if (state.auth.isLogin) {
        this.ToDashboard();
      }
    })
	}

	private handleRedirectMsg(redirect:string)
	{
		if (redirect === 'register') {
			this._redirect = "Registration successful. Please log in with your registered email and password."
		}
		else if (redirect === 'unauth') {
			this._redirect = "Please log in.";
		}
	}

	LoginWithFacebook()
	{
		this.authService.LoginWithFacebook();
	}

	ToDashboard()
	{
		this._router.navigate(['/dashboard']);
	}

}
