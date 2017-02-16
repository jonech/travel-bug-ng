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
	constructor(
		private firebase: AngularFire,
		private router: Router
	){}

	private logout()
	{
		this.firebase.auth.logout();
		localStorage.removeItem('currentUserId');

		this.router.navigate(['/'])
	}

	private isLogin():boolean
	{
		if (localStorage.getItem('currentUserId')) {
			return true;
		}
		return false;
	}
}
