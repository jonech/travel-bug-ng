import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./auth.component.css'],
})

export class LoginComponent
{

	constructor
	(
		private firebase:AngularFire,
		private _router:Router
	){}

	private loginWithEmail(emailEl:any, passwordEl:any)
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
			localStorage.setItem('currentUserId', success.auth.uid);
			this.toDashboard();
		})
		.catch((error) => {
			console.log(JSON.stringify(error));
		});
	}

	private toDashboard()
	{
		this._router.navigate(['/dashboard']);
	}

}
