import { Injectable, ElementRef } from '@angular/core';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpEventType, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { FbUser } from '../models/fb-user.model';
import { User } from '../models/user.model';

import { ProfileDefaultBase64 } from '../shared/util/string.util';
import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';
// import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

interface LoginResponse {
  jwt?: string
  errors?: any
}

@Injectable()
export class AuthService {

  public JWT = 'jwtoken';
  private loginUrl = `${environment.apiUrl}/user/signin`;
  private registerUrl = `${environment.apiUrl}/user/signup`;
  private validateUrl = `${environment.apiUrl}/user/validate`;

  constructor(
    private _router: Router,
    private http: HttpClient,
		private fb: FacebookService
	) {}
    //TODO: change default photo
	LoginWithFacebook() {
		// this._afAuth.auth
		// .signInWithPopup(new firebase.auth.FacebookAuthProvider())
		// .then(resolve => {
		// 	console.log(resolve);

		// 	let fbUser: FbUser = new FbUser();

		// 	let fullName: string[] = resolve.auth.providerData[0].displayName.split(" ");

		// 	fbUser.firstname = fullName[0];
		// 	fbUser.lastname = fullName[1];
		// 	fbUser.facebookUserId = resolve.auth.providerData[0].uid;

		// 	let emailTemp: string = resolve.auth.providerData[0].email;
		// 	console.log(emailTemp);
		// 	console.log(fbUser.facebookUserId );

		// 	if(emailTemp==null){
		// 		fbUser.email = "No Email Added";
		// 	}else{
		// 		fbUser.email = emailTemp;
		// 	}

		// 	this.saveFbUserDetails(resolve.uid, fbUser);

		// 	this.ToDashBoard();
		// })
		// .catch(error => {
		// 	console.log(error.message);
		// })
	}

  public loginWithEmail(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(this.loginUrl, {
              email: email,
              password: password
            })
            .map((res) => {
              if (res.errors) return false;
              localStorage.setItem(this.JWT, res.jwt);
              return true;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public registerWithEmail(user: User): Observable<boolean> {
    return this.http.post(this.registerUrl, { user: user })
            .map((res) => {
              return true;
            })
            .catch((error: any) => Observable.throw(error || 'server error'));
  }

  public validateJWT(): Observable<string> {
    let jwt = localStorage.getItem(this.JWT);
    if (jwt == null) {
      Observable.throw('Require login');
    }
    return this.http.get(`${this.validateUrl}?jwt=${jwt}`)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public logout() {
    localStorage.removeItem(this.JWT);
  }

  public getJWT() {
    return localStorage.getItem(this.JWT);
  }

	private saveFbUserDetails(uid:string, fBuser:FbUser) {
		// this._afDB.object(`/User/${uid}/UserDetails`).update(
		// 	{
		// 		email: fBuser.email,
		// 		facebookUserId: fBuser.facebookUserId,
		// 		firstName: fBuser.firstname,
		// 		lastName: fBuser.lastname,
		// 		phone: "No Phone Added",
		// 		profileImage: ProfileDefaultBase64
		// 	}
		// )
	}

  ToDashBoard() {
		this._router.navigate(['/dashboard']);
	}
}
