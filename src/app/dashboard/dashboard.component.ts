import { Component, OnInit } from '@angular/core';

import { Trip } from '../models/trip.model';

@Component({
	selector: 'dashboard',
  template: `
    <div class="trip-heading">
      <a [routerLink]="['trips']">My Trips</a>  |
      <a [routerLink]="['past_trip']">Past Trips</a>
    </div>

    <div id="button-row">
      <div>
        <a id="create-trip-button" class="right" (click)="OpenCreateTrip()">new trip+</a>
      </div>
    </div>

    <router-outlet></router-outlet>

    <create-trip-modal [isVisible]="isCreateTripOpen" (createTripClose)="CloseCreateTrip($event)"></create-trip-modal>
  `,
	styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit
{
	isCreateTripOpen: boolean = false;
	private uid:string;

	constructor(
	){}

	ngOnInit() {

	}

	OpenCreateTrip() {
		this.isCreateTripOpen = true;
	}

	CloseCreateTrip(event: any) {
		this.isCreateTripOpen = false;
	}

	CreateNewTrip(trip: Trip)
	{
		// var days = {};
		// for (var i=0; i< Number(trip.numberOfDays); i++) {
		// 	var temp = this._afDB.list(`/DayTrip`).push({});
		// 	days[`Day${i+1}`] = temp.key;
		// }

		// trip.Days = days;
		// console.log(trip.Days);
		// console.log(trip);
		// // for (var day in trip.Days) {
		// // 	console.log(day);
		// // }
		// var tempTrip = this._afDB.list(`/Trip`).push(trip);

		// this._afDB.object(`/Trip/${tempTrip.key}/User/Admin/${this.uid}`).set('not sure');
		// this._afDB.object(`/User/${this.uid}/Trip/${tempTrip.key}`).set('not sure');
		// this.CloseCreateTrip();
	}
}
