import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { DayTripService } from 'app/services';
import { EmitterService } from 'app/services';
import * as String from 'app/shared/util/string.util';
import { DayTrip } from 'app/models/day-trip.model';

@Component({
  selector: 'day-trip-view',
  styleUrls: ['day-trip-view.component.scss'],
  template: `
    <div nz-row>
      <div nz-col [nzSpan]="4">
        <div class="left-side-bar">
          <nz-affix class="timeline">
            <nz-anchor>
              <nz-link *ngFor="let day of dayTripList; let i = index"
                nzHref="#item-{{i}}"
                nzTitle="{{ day.dayTripName }}">
              </nz-link>
            </nz-anchor>
          </nz-affix>
          <button nz-button [nzLoading]="addDayTripLoading" [nzType]="'primary'" (click)="createDayTrip()">
            <span>Add Day Trip</span><i class="anticon anticon-plus"></i>
          </button>
        </div>
      </div>

      <div nz-col [nzSpan]="14">
        <div *ngFor="let d of dayTripList; let i = index" class="day-trip">
          <!-- anchor -->
          <span [id]="'item-'+i"></span>
          <h4>{{ d.dayTripName }} {{ d.date }}</h4>

          <div *ngFor="let a of d.activities; let j = index">
            <event></event>
          </div>
        </div>
      </div>

      <div nz-col [nzSpan]="6">
        <div class="right-side-bar">
          <button class="activity-button" (click)="createEvent()"><i class="anticon anticon-plus"></i><br><span>Add Activity</span></button>
          <button class="activity-button"><i class="anticon anticon-plus"></i><br>Add Transport</button>
        </div>
      </div>
    </div>

    <create-event-modal></create-event-modal>
  `
})
export class DayTripViewComponent implements OnInit {

  dayTripList: Array<DayTrip> = [];
  tripId: string;

  addDayTripLoading: boolean = false;

  dayTripId: string;
  numbers: Array<string> = new Array<string>();

	daySubject: Subject<any>;

	constructor(
		private route: ActivatedRoute,
    private router: Router,
    private dayTripService: DayTripService
		// private firebase: AngularFireDatabase
	) {
		this.daySubject = new Subject();
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
      this.tripId = params['tripId'];

      let responded = false;
      this.dayTripService.getDayTrips(this.tripId)
        .takeWhile(() => !responded)
        .subscribe(res => {
          console.log(res);
          this.dayTripList = res;
          responded = true;
        })
    });


	}

  createEvent() {
    EmitterService.get(String.CREATE_EVENT).emit(true);
  }

  createDayTrip() {
    let responded = false;
    this.addDayTripLoading = true;

    this.dayTripService.createDayTrip(this.tripId, null)
      .takeWhile(() => !responded)
      .subscribe(res => {
        this.dayTripList.push(res);
        this.addDayTripLoading = false;
        responded = true;
      })
  }
}
