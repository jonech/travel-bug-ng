import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

import { User } from '../../models/user.model';
import { FbUser } from '../../models/fb-user.model';
import { ProfileDefaultBase64, EmailRegEx } from '../../shared/util/string.util';

import{ AuthService } from '../../services/auth.service';

@Component({
	selector: 'register',
	templateUrl: 'register.component.html',
	styleUrls: ['register.component.css'],
})

export class RegisterComponent implements OnInit
{
	public registerForm: FormGroup;
	_submitted: boolean = false;

	//_userRef: FirebaseObjectObservable<any>;
	_error: string;


	constructor(
		// private _afAuth: AngularFireAuth,
		// private _afDB: AngularFireDatabase,
		private _formBuild: FormBuilder,
		private _router: Router,
		private authService: AuthService
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

		// this._afAuth.auth.
		// createUserWithEmailAndPassword(user.email, user.password)
		// .then(resolve => {
		// 	console.log(resolve);
		// 	this.saveUserDetails(resolve.uid, user);
		// 	this.ToLogin();
		// 	this.registerForm.reset;
		// })
		// .catch(error => {
		// 	this._error = error.message;
		// });
	}

//TODO: change default photo
	LoginWithFacebook()
	{
		this.authService.LoginWithFacebook();
	}



	private saveUserDetails(uid:string, user:User)
	{
		// this._afDB.object(`/User/${uid}/UserDetails`).update(
		// 	{
		// 		email: user.email,
		// 		firstName: user.firstName,
		// 		lastName: user.lastName,
		// 		phone: "No Phone Added",
		// 		profileImage: ProfileDefaultBase64
		// 	}
		// )
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
