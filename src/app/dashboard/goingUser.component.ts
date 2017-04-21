import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
	selector: 'going-user',
	templateUrl: './goingUser.component.html',
	styleUrls: ['./goingUser.component.css', './dashboard.component.css']
})

export class GoingUserComponent implements OnInit
{

	@Input() goingUserId:string;
	_user: FirebaseObjectObservable<any>;

	constructor(
		private firebase: AngularFire,
		private sanitizer: DomSanitizer
	){}

	ngOnInit()
	{
		this._user = this.firebase.database.object(`/User/${this.goingUserId}/UserDetails`);
	}

	sanitize(url: string)
	{
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

}
