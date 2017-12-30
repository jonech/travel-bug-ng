import { Component, OnInit, OnDestroy, NgZone } from '@angular/core'

import { TripService } from '../../services';
import { EmitterService } from '../../services';
import { Trip } from '../../models/trip.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'trip-list',
	templateUrl: 'trip-list.component.html',
	styleUrls: ['../dashboard.component.scss'],
})

export class TripListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  trips$: Observable<Trip[]>;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	constructor(
    private tripService: TripService,
    private ngZone: NgZone
	) {}

	ngOnInit() {
    this.isLoading$.next(true);

    this.trips$ = this.tripService.getTrips().finally(() => {
      this.isLoading$.next(false);
    });

    // listen to trip creation
    EmitterService.get('[Trip] Refresh')
      .takeUntil(this.ngUnsubscribe)
      .subscribe(trip => {
        this.isLoading$.next(true);
        this.trips$ = this.tripService.getTrips().finally(() => {
          this.isLoading$.next(false);
        });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
