import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

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
		private firebase:AngularFire,
		private _router:Router,
		private _route: ActivatedRoute,
	){}

	ngOnInit()
	{
		this._route.params.subscribe(params => {
			this.handleRedirectMsg(params['redirect']);
		});
	}

	LoginWithEmail(emailEl:any, passwordEl:any)
	{
		this.firebase.auth.login({
			email: emailEl.value,
			password: passwordEl.value
		},
		{
			provider: AuthProviders.Password,
			method: AuthMethods.Password
		})
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

	ToDashboard()
	{
		this._router.navigate(['/dashboard']);
	}

}
