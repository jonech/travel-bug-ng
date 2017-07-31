import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Subject } from 'rxjs/Subject';

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

	_currentDay: string; // display of current day on dropdown nav
	_show: boolean = false; // dropdown list show or not

	daySubject: Subject<any>;

	constructor(
		private route: ActivatedRoute,
        private router: Router,
		private firebase: AngularFire
	)
	{
		this.daySubject = new Subject();

		this.route.params.subscribe(params => {

			this._tripId = params['tripId'];
			this._dayTripListRef = this.firebase.database.list(`/Trip/${this._tripId}/Days`, {
                query: { orderByValue: true }
            });

			// dayref will be varrying depending on which day is nav to
			firebase.database.list(`/Trip/${this._tripId}/Days`,
			{
				query: {
					orderByValue: true,
					equalTo: this.daySubject
				},
				preserveSnapshot: true
			})
			.subscribe(snapshots => {
				this._currentDay = snapshots[0].key;
			});
		});
	}

	ngOnInit()
	{
		// always close dropdown nav when navigated to another day
		this._show = false;
		this.route.params.subscribe(params => {

			this._dayTripId = params['dayTripId'];
			this.daySubject.next(this._dayTripId);
		});
	}

	showDropDown()
	{
		this._show = !this._show;
	}

    AddActivity()
    {
        if (this._currentDay == null) {
            return;
        }

        var tempAcc = this.firebase.database.list(`/DayTrip/${this._currentDay}`).push({});
        console.log(tempAcc.key);
        //console.log(this.router.url);
        console.log(`${this.router.url}/(pop-up:${tempAcc.key})`);
        //this.router.navigate([{ outlets: { 'pop-up': [ tempAcc.key] }}]);
        this.router.navigateByUrl(`${this.router.url}/(pop-up:${tempAcc.key})`);
    }
}
