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

	ngOnInit() {
    console.log(this.trip);
	}

	showTripDetail(id: string) {
		if (id != null) {
			this.router.navigate(['/trip', id]);
		}
	}
}
