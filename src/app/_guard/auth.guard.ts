import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AngularFireAuth } from 'angularfire2';
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate
{
	constructor(
		private router: Router,
		private fireAuth: AngularFireAuth
	)
	{ }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
	{
		return this.fireAuth.map((auth) => {
			if (auth) {
				console.log("authed!");
				return true;
			}
			console.log("not auth");
			this.router.navigate(['/login', { redirect: 'unauth' }]);
			return false;
		})
	}
}