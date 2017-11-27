import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router'

import { Trip } from '../../models';

@Component({
	selector: 'trip',
	templateUrl: 'trip.component.html',
	styleUrls: ['trip.component.scss']
})

export class TripComponent implements OnInit
{
	@Input() trip: Trip;

	constructor(
		private router: Router,
	){}

	ngOnInit()
	{
    console.log(this.trip);
		// this._trip = this.firebase.object(`/Trip/${this.tripId}`);
		// this._tripDays = this.firebase.list(`/Trip/${this.tripId}/Days`);
		// this._tripRegulars = this.firebase.list(`/Trip/${this.tripId}/User/Regular`);
		// this._tripAdmins = this.firebase.list(`/Trip/${this.tripId}/User/Admin`);
		//this._tripRegulars.push(this._tripAdmins);
	}

	showTripDetail(id: string)
	{
		if (id != null) {
			this.router.navigate(['/trip', id]);
		}
	}
}
