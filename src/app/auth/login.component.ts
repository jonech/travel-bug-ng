import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./auth.component.css'],
})

export class LoginComponent implements OnInit
{
	_redirect: string;
	_error: string;

	constructor
	(
		private _afAuth:AngularFireAuth,
		private _router:Router,
		private _route: ActivatedRoute,
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
		// this._afAuth.auth.login({
		// 	email: emailEl.value,
		// 	password: passwordEl.value
		// },
		// {
		// 	provider: AuthProviders.Password,
		// 	method: AuthMethods.Password
		// })
		this._afAuth.auth.signInWithEmailAndPassword(emailEl.value, passwordEl.value)
		.then((success) => {
			//localStorage.setItem('currentUserId', success.auth.uid);
			this.ToDashboard();
		})
		.catch((error) => {
			this._error = error.message;
			console.log(JSON.stringify(error));
		});
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
