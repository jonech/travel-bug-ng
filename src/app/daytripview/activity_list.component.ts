import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
	selector: 'activity-list',
	templateUrl: './activity_list.component.html',
	styleUrls: ['./activity_list.component.css']
})

export class ActivityListComponent implements OnChanges
{
	@Input('dayTripId') _dayTripId: string;

	_activities: FirebaseListObservable<any[]>;

	constructor(
		private firebase: AngularFire,
		private route: ActivatedRoute
	){}

	ngOnChanges(changes: SimpleChanges)
	{
		//console.log(this._dayTripId);
		// if (changes['dayTripId'] && this._dayTripId != null) {
		// 	console.log(this._dayTripId);
		// 	this._activities = this.firebase.database.list(`/DayTrip/${this._dayTripId}`, {
		// 		query: {
		// 			orderByChild: 'timeSort'
		// 		}
		// 	});
		// }
		this._activities = this.firebase.database.list(`/DayTrip/${this._dayTripId}`, {
			query: {
				orderByChild: 'timeSort'
			}
		});
	}
}
