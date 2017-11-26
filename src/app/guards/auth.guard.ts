import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate
{
	isAuth: boolean = false;

	constructor(
		private router: Router,
    private fireAuth: AngularFireAuth,
    private auth: AuthService
	)
	{ }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>
	{
      return this.auth.validateJWT().map(e => {
              if (e) {
                console.log(e);
                return true;
              }}).catch((e) => {
                console.log(e)
                this.router.navigate(['/login', { redirect: 'unauth' }]);
                return Observable.of(false);
              });
    }
    // return this.fireAuth.authState.map((auth) => {
    //   if (auth) {
 		// 		console.log("authed!");
 		// 		return true;
 		// 	}
 		// 	console.log("not auth");
 		// 	this.router.navigate(['/login', { redirect: 'unauth' }]);
 		// 	return false;
    // });
}
