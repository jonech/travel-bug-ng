import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent
{
	private _isLogin: boolean = false;

	constructor(
		private firebase: AngularFire,
		private router: Router
	)
	{
		firebase.auth.subscribe(auth => {
			if (auth) {
				this._isLogin = true;
			}
			else {
				this._isLogin = false;
			}
		})
	}

	private logout()
	{
		this.firebase.auth.logout();
		this.router.navigate(['/'])
	}
}
