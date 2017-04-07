import { Component, OnInit } from '@angular/core';

import { AngularFire, FirebaseListObservable, FirebaseAuth } from 'angularfire2';

import { Trip } from '../_model/trip.model';

@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit
{
	private _isSplashOpen:boolean = false;
	private uid:string;

	constructor(
		private firebase: AngularFire,
		private auth: FirebaseAuth,
	){}

	ngOnInit()
	{
		this.auth.subscribe(auth => {
			this.uid = auth.uid;
		})
	}

	private OpenCreateTrip()
	{
		this._isSplashOpen = true;
		console.log(this._isSplashOpen)
	}

	private CloseCreateTrip()
	{
		this._isSplashOpen = false;
	}

	private CreateNewTrip(trip: Trip)
	{
		var days = {};
		for (var i=0; i< Number(trip.numberOfDays); i++) {
			var temp = this.firebase.database.list(`/DayTrip`).push({});
			days[`Day${i+1}`] = temp.key;
		}

		trip.Days = days;
		console.log(trip.Days);
		console.log(trip);
		// for (var day in trip.Days) {
		// 	console.log(day);
		// }
		var tempTrip = this.firebase.database.list(`/Trip`).push(trip);

		this.firebase.database.object(`/Trip/${tempTrip.key}/User/Admin/${this.uid}`).set('not sure');
		this.firebase.database.object(`/User/${this.uid}/Trip/${tempTrip.key}`).set('not sure');
		this.CloseCreateTrip();
	}
}
