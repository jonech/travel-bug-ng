import { Component } from '@angular/core'
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
	selector: 'past-trip',
	templateUrl: './past_trip.component.html',
	styleUrls: ['./dashboard.component.css', './past_trip.component.css'],
})

export class PastTripComponent
{
	_trips: FirebaseListObservable<any[]>;
	//_Users: Observable<any[]>;

	constructor(
		private firebase: AngularFire
	)
	{
		firebase.auth.subscribe(auth => {
			if (!auth) { return; }

			let uid = auth.uid;
			this._trips = this.firebase.database.list('/User/' + uid + "/PastTrip");
		})
	}
}
