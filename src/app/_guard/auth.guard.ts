import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate
{
	isAuth: boolean = false;

	constructor(
		private router: Router,
		private fireAuth: AngularFireAuth
	)
	{ }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
	{
		// this.fireAuth.subscribe((auth) => {
		// 	if (auth) {
		// 		console.log("authed!!")
		// 		this.isAuth = true;
		// 	}
		// })

		// if (!this.isAuth) {
		// 	console.log("not auth");
		// 	this.router.navigate(['/login', { redirect: 'unauth' }]);
		// }

		// return this.isAuth;

        return this.fireAuth.authState.map((auth) => {
            if (auth) {
 				console.log("authed!");
 				return true;
 			}
 			console.log("not auth");
 			this.router.navigate(['/login', { redirect: 'unauth' }]);
 			return false;
        });
	}
}
