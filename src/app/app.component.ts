import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { FacebookService } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent
{
	_isLogin: boolean = false;
	_isfbLogin: boolean = false;

	constructor(
		private firebase: AngularFire,
		private router: Router,
		private fb: FacebookService
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
		console.log("Log out successfully");
		
 		this.router.navigate(['/']);
	}
}
