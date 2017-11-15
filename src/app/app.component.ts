import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
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
		private firebase: AngularFireDatabase,
		private afAuth: AngularFireAuth,
		private router: Router,
		private fb: FacebookService
	)
	{
		this.afAuth.authState.subscribe(auth => {
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
		this.afAuth.auth.signOut();
		console.log("Log out successfully");
		
 		this.router.navigate(['/']);
	}

	private goToExternalURL(url: string) {
		window.location.href=url;
	}
}
