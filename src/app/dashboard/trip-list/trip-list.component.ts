import { Component, OnInit } from '@angular/core'

import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'trip-list',
	templateUrl: 'trip-list.component.html',
	styleUrls: ['../dashboard.component.scss'],
})

export class TripListComponent implements OnInit
{
	trips: Observable<Trip[]>;

	constructor(
    private tripService: TripService
	) {}

	ngOnInit() {
    this.trips = this.tripService.getTrips();
  }
}
