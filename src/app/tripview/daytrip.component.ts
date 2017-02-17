import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFire,  FirebaseListObservable } from 'angularfire2';

@Component({
	selector: 'day-trip',
	templateUrl: './daytrip.component.html',
	styleUrls: ['./daytrip.component.css', './daytriplist.component.css', '../dashboard/dashboard.component.css'],
})

export class DayTripComponent implements OnInit
{
	@Input() dayTripId: string;
	@Input() tripId: string;
	@Input() day: string;
	@Input() date: string;

	private _activities: FirebaseListObservable<any[]>;
	private _activityNoLimit: FirebaseListObservable<any[]>;

	constructor(
		private firebase: AngularFire,
		private router: Router
	){}

	public ngOnInit()
	{
		this._activities = this.firebase.database.list(`/DayTrip/${this.dayTripId}`,
			{ query: {
				orderByChild: 'timeSort',
				limitToFirst: 3
			}});
		this._activityNoLimit = this.firebase.database.list(`/DayTrip/${this.dayTripId}`);
	}

	private toDayTripView()
	{
		this.router.navigate([`/daytrip/${this.tripId}/${this.dayTripId}`]);
	}
}
