import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
import { FacebookService } from 'ngx-facebook';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html'
})

export class HeaderComponent
{
	_isLogin: boolean = false;
	_isfbLogin: boolean = false;

	constructor(
		private firebase: AngularFireDatabase,
		private afAuth: AngularFireAuth,
		private router: Router,
    private fb: FacebookService,
    private auth: AuthService
	)
	{
		this.auth.validateJWT().subscribe(res => {
			if (res) {
				this._isLogin = true;
			}
			else {
				this._isLogin = false;
			}
		}, (err) => {
      this._isLogin = false;
    })
	}

	private logout()
	{
		this.auth.logout();
    console.log("Log out successfully");
    this._isLogin = false;
 		this.router.navigate(['/']);
	}
}
