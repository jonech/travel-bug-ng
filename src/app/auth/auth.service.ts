import { Injectable, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FbUser } from '../_model/fb-user.model';
import { ProfileDefaultBase64 } from '../_util/string.util';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    constructor(
		private _afAuth: AngularFireAuth,
		private _afDB: AngularFireDatabase,
		private _router: Router,
		private fb: FacebookService
	) {}
    //TODO: change default photo 
	LoginWithFacebook()
	{
		this._afAuth.auth
		.signInWithPopup(new firebase.auth.FacebookAuthProvider())
		.then(resolve => {
			console.log(resolve);
			
			let fbUser: FbUser = new FbUser();

			let fullName: string[] = resolve.auth.providerData[0].displayName.split(" ");

			fbUser.firstname = fullName[0];
			fbUser.lastname = fullName[1];
			fbUser.facebookUserId = resolve.auth.providerData[0].uid;

			let emailTemp: string = resolve.auth.providerData[0].email;
			console.log(emailTemp);
			console.log(fbUser.facebookUserId );
			
			if(emailTemp==null){
				fbUser.email = "No Email Added";
			}else{
				fbUser.email = emailTemp;
			}
			
			this.saveFbUserDetails(resolve.uid, fbUser);
            
			this.ToDashBoard();
		})
		.catch(error => {
			console.log(error.message);
		})
        
        
	}

	private saveFbUserDetails(uid:string, fBuser:FbUser)
	{
		this._afDB.object(`/User/${uid}/UserDetails`).update(
			{
				email: fBuser.email,
				facebookUserId: fBuser.facebookUserId,
				firstName: fBuser.firstname,
				lastName: fBuser.lastname,
				phone: "No Phone Added",
				profileImage: ProfileDefaultBase64
			}
		)
	}

    ToDashBoard()
	{
		this._router.navigate(['/dashboard']);
	}
}