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
	@Input() dayTripId: string;

	_activities: FirebaseListObservable<any[]>;

	constructor(
		private firebase: AngularFire,
		private route: ActivatedRoute
	){}

	ngOnChanges(changes: SimpleChanges)
	{
		if (changes['dayTripId'] && this.dayTripId != null) {
			this._activities = this.firebase.database.list(`/DayTrip/${this.dayTripId}`, {
				query: {
					orderByChild: 'timeSort'
				}
			});
		}
	}
}
