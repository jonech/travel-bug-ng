import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';

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
		private firebase: AngularFireDatabase,
		private sanitizer: DomSanitizer
	){}

	ngOnInit()
	{
        console.log(`fetching image for user ${this.goingUserId}`);
		this._user = this.firebase.object(`/User/${this.goingUserId}/UserDetails`);
	}

	sanitize(url: string)
	{
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

}
