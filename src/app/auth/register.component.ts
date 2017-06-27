import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFire, FirebaseObjectObservable, AuthProviders, AuthMethods } from 'angularfire2'

import { User } from '../_model/user.model';
import { FbUser } from '../_model/fb-user.model';
import { ProfileDefaultBase64, EmailRegEx } from '../_util/string.util';

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit
{
	public registerForm: FormGroup;
	_submitted: boolean = false;

	_userRef: FirebaseObjectObservable<any>;
	_error: string;
	

	constructor(
		private _firebase: AngularFire,
		private _formBuild: FormBuilder,
		private _router: Router,
	) {}

	ngOnInit()
	{
		this.registerForm = this._formBuild.group({
			email: ['', [Validators.required, Validators.pattern(EmailRegEx)]],
			firstname: ['', [Validators.required, Validators.minLength(2)]],
			lastname: ['', [Validators.required, Validators.minLength(2)]],
			matchingPwd: this._formBuild.group({
				password: ['', [Validators.required, Validators.minLength(8)]],
				passwordconf: ['', [Validators.required]],
			})
		},
		{
			validator: this.matchingPassword('matchingPwd.password', 'matchingPwd.passwordconf')
		});
	}

	RegisterWithEmail(user:User, isValid:boolean)
	{
		if (!isValid) {
			this._submitted = true;
			return;
		}
		this._submitted = true;
		//this.registerForm.reset();

		this._firebase.auth.createUser({
			email: user.email,
			password: user.matchingPwd.password
		})
		.then(resolve => {
			console.log(resolve);
			this.saveUserDetails(resolve.uid, user);
			this.ToLogin();
			this.registerForm.reset;
		})
		.catch(error => {
			this._error = error.message;
		});
	}

//TODO: change default photo 
	LoginWithFacebook()
	{
		this._firebase.auth.login({
			provider: AuthProviders.Facebook,
			method: AuthMethods.Popup
		})
		.then(resolve => {
			let fbUser: FbUser = new FbUser();

			let fullName: string[] = resolve.auth.providerData[0].displayName.split(" ");

			fbUser.firstname = fullName[0];
			fbUser.lastname = fullName[1];
			fbUser.facebookUserId = resolve.auth.providerData[0].uid;

			let emailTemp: string = resolve.auth.providerData[0].email;
			console.log(emailTemp);
			
			if(emailTemp==null){
				fbUser.email = "No Email Added";
			}else{
				fbUser.email = emailTemp;
			}
			
			this.saveFbUserDetails(resolve.uid, fbUser);

			this.ToLogin();
		})
		.catch(error => {
			console.log(error.message);
		})
	}

	private saveFbUserDetails(uid:string, fBuser:FbUser)
	{
		this._firebase.database.object(`/User/${uid}/UserDetails`).update(
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

	private saveUserDetails(uid:string, user:User)
	{
		this._firebase.database.object(`/User/${uid}/UserDetails`).update(
			{
				email: user.email,
				firstName: user.firstname,
				lastName: user.lastname,
				phone: "No Phone Added",
				profileImage: ProfileDefaultBase64
			}
		)
	}

	private matchingPassword(password:string, passwordconf:string)
	{
		return (group: FormGroup) => {
			let input = group.get(password);
			let repeat = group.get(passwordconf);
			if (input.value !== repeat.value) {
				return repeat.setErrors({notEquivalent: true});
			}
		}
	}

	ToLogin()
	{
		this._router.navigate(['/login', {redirect: 'register'}]);
	}
}
