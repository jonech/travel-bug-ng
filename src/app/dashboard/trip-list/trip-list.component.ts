import { Component, OnInit, OnDestroy, NgZone } from '@angular/core'

import { TripService } from '../../services';
import { EmitterService } from '../../services';
import { Trip } from '../../models/trip.model';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'trip-list',
	templateUrl: 'trip-list.component.html',
	styleUrls: ['../dashboard.component.scss'],
})

export class TripListComponent implements OnInit, OnDestroy
{
	trips: Observable<Trip[]>;

	constructor(
    private tripService: TripService,
    private ngZone: NgZone
	) {}

	ngOnInit() {
    this.trips = this.tripService.getTrips();

    // listen to trip creation
    EmitterService.get('[Trip] Created').subscribe(trip => {
      this.trips = this.tripService.getTrips();
    })
  }

  ngOnDestroy() {}
}
