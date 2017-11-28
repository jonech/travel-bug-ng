import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmitterService } from '../../services/event-emitter.service';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['../auth.component.css'],
})

export class LoginComponent implements OnInit
{
	_redirect: string;
	_error: string;

	constructor
	(
		private _router:Router,
		private _route: ActivatedRoute,
    private authService: AuthService
	){}

	ngOnInit()
	{
		this._route.params.subscribe(params => {
			this.handleRedirectMsg(params['redirect']);
		});
	}

	LoginWithEmail(emailEl:any, passwordEl:any)
	{
    this.authService.loginWithEmail(emailEl.value, passwordEl.value)
      .subscribe((res) => {
        if (res) {
          EmitterService.get('LoginComponent').emit(true);
          this.ToDashboard();
        };
      }, (err) => {
        //TODO: prompt user
        console.log(err);
        alert(err);
      });
	}

	private handleRedirectMsg(redirect:string)
	{
		if (redirect === 'register') {
			this._redirect = "Registration successful. Please log in with your registered email and password."
		}
		else if (redirect === 'unauth') {
			this._redirect = "Please log in.";
		}
	}

	LoginWithFacebook() {
		this.authService.LoginWithFacebook();
	}

	ToDashboard() {
		this._router.navigate(['/dashboard']);
	}

}
