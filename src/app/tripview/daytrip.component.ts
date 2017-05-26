import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFire,  FirebaseListObservable } from 'angularfire2';
import { DateCount } from '../_util/datetime.util';

@Component({
	selector: 'day-trip',
	templateUrl: './daytrip.component.html',
	styleUrls: ['./daytrip.component.css'],
})

export class DayTripComponent implements OnInit
{
	@Input() dayTripId: string;
	@Input() tripId: string;
	@Input() day: string;
	@Input() date: string;
	@Input('startDate') _startDate: string;

	_activities: FirebaseListObservable<any[]>;
	_activityNoLimit: FirebaseListObservable<any[]>;

	constructor(
		private firebase: AngularFire,
		private router: Router,
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

	ToDayTripView()
	{
		this.router.navigate([`/daytrip/${this.tripId}/${this.dayTripId}`]);
	}

    GetDate(startDate: string, daynum: string)
    {
        return DateCount(startDate, daynum);
    }
}
