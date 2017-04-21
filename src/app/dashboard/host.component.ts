import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
	moduleId: module.id,
	selector: 'host',
	styleUrls:['./trip.component.css'],
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
		private firebase: AngularFire
	) { }

	ngOnInit()
	{
		this._host = this.firebase.database.object(`/User/${this.userId}/UserDetails`);
		console.log(this.userId);
	}
}
