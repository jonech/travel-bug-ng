import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';

import { Trip } from '../models/trip.model';

@Component({
	selector: 'dashboard',
	templateUrl: 'dashboard.component.html',
	styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit
{
	_isSplashOpen:boolean = false;
	private uid:string;

	constructor(
		private _afAuth: AngularFireAuth,
		private _afDB: AngularFireDatabase
	){}

	ngOnInit()
	{
		this._afAuth.authState.subscribe(auth => {
			if (auth)
				this.uid = auth.uid;
		})
	}

	OpenCreateTrip()
	{
		this._isSplashOpen = true;
		console.log(this._isSplashOpen)
	}

	CloseCreateTrip()
	{
		this._isSplashOpen = false;
	}

	CreateNewTrip(trip: Trip)
	{
		var days = {};
		for (var i=0; i< Number(trip.numberOfDays); i++) {
			var temp = this._afDB.list(`/DayTrip`).push({});
			days[`Day${i+1}`] = temp.key;
		}

		trip.Days = days;
		console.log(trip.Days);
		console.log(trip);
		// for (var day in trip.Days) {
		// 	console.log(day);
		// }
		var tempTrip = this._afDB.list(`/Trip`).push(trip);

		this._afDB.object(`/Trip/${tempTrip.key}/User/Admin/${this.uid}`).set('not sure');
		this._afDB.object(`/User/${this.uid}/Trip/${tempTrip.key}`).set('not sure');
		this.CloseCreateTrip();
	}
}
