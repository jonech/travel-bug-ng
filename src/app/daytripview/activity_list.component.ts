import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';

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
		private firebase: AngularFireDatabase,
		private route: ActivatedRoute
	){}

	ngOnChanges(changes: SimpleChanges)
	{
		//console.log(this._dayTripId);
		// if (changes['dayTripId'] && this._dayTripId != null) {
		// 	console.log(this._dayTripId);
		// 	this._activities = this.firebase.list(`/DayTrip/${this._dayTripId}`, {
		// 		query: {
		// 			orderByChild: 'timeSort'
		// 		}
		// 	});
		// }
		this._activities = this.firebase.list(`/DayTrip/${this._dayTripId}`, {
			query: {
				orderByChild: 'timeSort'
			}
		});
	}
}
