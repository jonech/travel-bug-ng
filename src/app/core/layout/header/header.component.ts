import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
import { FacebookService } from 'ngx-facebook';
import { AuthService } from '../../../_service/auth.service';
import { Store } from '@ngrx/store';
import * as AuthAction from '../../../action/auth.actions';
import { Auth } from '../../../_model/auth.model';
import { Observable } from 'rxjs/Observable';

interface AppState {
  auth: Auth;
}

@Component({
  selector: 'header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit
{
	_isLogin: boolean = false;
	_isfbLogin: boolean = false;

  auth: Observable<Auth>;

	constructor(
		private firebase: AngularFireDatabase,
		private afAuth: AngularFireAuth,
		private router: Router,
    private fb: FacebookService,
    private authService: AuthService,
    private store: Store<AppState>
	)
	{
		// this.authService.validateJWT().subscribe(res => {
		// 	if (res) {
		// 		this._isLogin = true;
		// 	}
		// 	else {
		// 		this._isLogin = false;
		// 	}
		// }, (err) => {
    //   this._isLogin = false;
    // })
	}

  ngOnInit() {
    this.auth = this.store.select('auth');
    this.store.dispatch(new AuthAction.Validate());
  }

	private logout() {
    //this.authService.logout();
    this.store.dispatch(new AuthAction.Logout());
    console.log("Log out successfully");
    this._isLogin = false;
 		this.router.navigate(['/']);
	}
}
