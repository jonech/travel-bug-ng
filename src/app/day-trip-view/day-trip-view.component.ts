import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { DragulaService } from 'ng2-dragula';

import { DayTripService } from 'app/services';
import { EmitterService } from 'app/services';
import * as String from 'app/shared/util/string.util';
import { DayTrip, EventActivity } from 'app/models';

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

          <div nz-row [dragula]="'bag-activity'"  [dragulaModel]="d.activities">
            <event *ngFor="let a of d.activities; let j = index" [event]="a"></event>
          </div>
        </div>

        <div *ngIf="dayTripList.length <= 0">
          <h3>Create a new day trip and start planning!</h3>
        </div>
      </div>

      <div nz-col [nzSpan]="6">
        <div class="right-side-bar">
          <button class="activity-button" (click)="createEvent()"><i class="anticon anticon-plus"></i><br><span>Add Activity</span></button>
          <button class="activity-button"><i class="anticon anticon-plus"></i><br>Add Transport</button>

          <div id="temp-heading">Temporary Activities</div>
          <div class="temp-box" [dragula]="'bag-activity'" [dragulaModel]="tempEventList">
            <temp-event *ngFor="let temp of tempEventList; let i = index" [event]="temp"></temp-event>
          </div>
        </div>
      </div>
    </div>

    <create-event-modal></create-event-modal>
    <edit-temp-event-modal></edit-temp-event-modal>
    <edit-event-modal></edit-event-modal>
  `
})
export class DayTripViewComponent implements OnInit, OnDestroy {

  dayTripList: Array<DayTrip> = [];
  tempEventList: Array<EventActivity> = [];
  tripId: string;

  addDayTripLoading: boolean = false;

  dayTripId: string;
  numbers: Array<string> = new Array<string>();

	daySubject: Subject<any>;

	constructor(
		private route: ActivatedRoute,
    private router: Router,
    private dayTripService: DayTripService,
    private dragulaService: DragulaService
	) {
    this.daySubject = new Subject();

    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      console.log(value)
      this.onDrop(value.slice(1));
    });
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
      this.tripId = params['tripId'];

      let responded = false;
      // fetch list of daytrips
      this.dayTripService.getDayTrips(this.tripId)
        .takeWhile(() => !responded)
        .subscribe(res => {
          this.dayTripList = res;
          responded = true;
        });

      // listen to create event
      EmitterService.get(String.CREATE_TEMP_EVENT_SUBMIT).subscribe((temp) => {
        this.tempEventList.push(temp);
      });
    });
	}

  createEvent() {
    EmitterService.get(String.CREATE_TEMP_EVENT).emit(true);
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

  ngOnDestroy() {
    EmitterService.get(String.CREATE_TEMP_EVENT).unsubscribe();
  }

  private onDrop(args) {
    let [e, el] = args;
    // do something
    console.log(args);
    console.log(this.tempEventList);
  }
}
