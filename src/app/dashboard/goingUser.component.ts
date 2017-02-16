import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
		private firebase: AngularFire
	){}

	ngOnInit()
	{
		this._user = this.firebase.database.object(`/User/${this.goingUserId}/UserDetails`);
	}

}
