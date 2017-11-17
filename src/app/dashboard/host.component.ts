import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';

@Component({
	//moduleId: module.id,
	selector: 'host',
	styleUrls:['trip.component.scss'],
	template:
	`
		<span>
			{{ (_host | async)?.firstName }}
		</span>
	`
})

export class HostComponent implements OnInit {


	_host: FirebaseObjectObservable<any>;

	@Input('userId') userId: string;

	constructor(
		private firebase: AngularFireDatabase
	) { }

	ngOnInit()
	{
		this._host = this.firebase.object(`/User/${this.userId}/UserDetails`);
		console.log(this.userId);
	}
}
