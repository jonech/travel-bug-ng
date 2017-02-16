import { Component } from '@angular/core'
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
	selector: 'trip-list',
	templateUrl: './trip_list.component.html',
	styleUrls: ['./dashboard.component.css', './trip_list.component.css'],
})

export class TripListComponent
{
	_trips: FirebaseListObservable<any[]>;
	//_Users: Observable<any[]>;

	constructor(
		private firebase: AngularFire
	)
	{
		let uid = localStorage.getItem('currentUserId');
		this._trips = this.firebase.database.list('/User/' + uid + "/Trip");
	}
}
