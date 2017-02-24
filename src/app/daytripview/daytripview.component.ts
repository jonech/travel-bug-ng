import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
	selector: 'day-trip-view',
	templateUrl: './daytripview.component.html',
	styleUrls: ['./daytripview.component.css']
})

export class DayTripViewComponent implements OnInit
{
	_tripId: string;
	_dayTripId: string;

	_dayTripListRef: FirebaseListObservable<any[]>;


	constructor(
		private route: ActivatedRoute,
		private firebase: AngularFire
	){}

	ngOnInit()
	{
		this.route.params.subscribe(params => {

			this._dayTripId = params['dayTripId'];

			// prevent daytrip navigation get refresh
			if (this._tripId == null) {
				this._tripId = params['tripId'];
				this._dayTripListRef = this.firebase.database.list(`/Trip/${this._tripId}/Days`);
			}
		});
	}
}
