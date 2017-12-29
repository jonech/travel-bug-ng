import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { DragulaService } from 'ng2-dragula';

import { DayTripService, EmitterService, ActivityService } from 'app/services';
import * as string from 'app/shared/util/string.util';
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

          <!--<div [dragula]="'bag-activity'"  [dragulaModel]="d.activities">
            <event *ngFor="let a of d.activities; let j = index" [event]="a"></event>
          </div>-->
          <activity-list [dayTripId]="d.id" [tripId]="d.tripId" [activities]="d.activities"></activity-list>
        </div>

        <div *ngIf="dayTripList.length <= 0">
          <h3>Create a new day trip and start planning!</h3>
        </div>
      </div>

      <div nz-col [nzSpan]="6">
        <div class="right-side-bar">
          <div nz-row>
            <button class="activity-button" (click)="createTempEvent()"><i class="anticon anticon-plus"></i><br><span>Add Activity</span></button>
            <!--<button class="activity-button"><i class="anticon anticon-plus"></i><br>Add Transport</button>-->
          </div>

          <div id="temp-heading">Temporary Activities</div>
          <div class="temp-box" [dragula]="'bag-activity'" [dragulaModel]="tempEventList">
            <temp-event attr.activity-id="{{ temp.id }}" *ngFor="let temp of tempEventList; let i = index" [event]="temp"></temp-event>
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
  differ: any;

  addDayTripLoading: boolean = false;

  numbers: Array<string> = new Array<string>();

	daySubject: Subject<any>;

	constructor(
		private route: ActivatedRoute,
    private router: Router,
    private dayTripService: DayTripService,
    private dragulaService: DragulaService,
    private activityService: ActivityService
	) {
    this.daySubject = new Subject();

    dragulaService.drop.subscribe((value) => {
      let responded = false;
      let activityId = parseInt(value[1].getAttribute('activity-id')) || null;
      let dayTrip = this.findDroppedDayTrip(activityId);

      if (dayTrip != null) {
        if (activityId == null) {
          let activity = dayTrip.activities.find(x => x.id == null);
          this.handleNewActivityDrop(activity, dayTrip);
        }
        else {
          let activity = dayTrip.activities.find(x => x.id == activityId);
          this.handleActivityDrop(activity, dayTrip);
        }
      }
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

      // listen to create temp event
      EmitterService.get(string.CREATE_TEMP_EVENT_SUBMIT).subscribe((temp) => {
        this.tempEventList.push(temp);
      });

      // listen to event delete
      EmitterService.get(string.DELETE_ACTIVITY_SUCCESS).subscribe((activity: EventActivity) => {
        // process of update and remove the deleted activities after delete success
        let dayTripIndex = this.dayTripList.findIndex(d => d.id === activity.dayTripId);
        let deletedIndex = this.dayTripList[dayTripIndex].activities.findIndex(a => a.id === activity.id);
        this.dayTripList[dayTripIndex].activities.splice(deletedIndex, 1);
      });

      // listen to event created
      EmitterService.get(string.CREATE_EVENT_SUCCESS).subscribe((event: EventActivity) => {
        let dayTripIndex = this.dayTripList.findIndex(d => d.id === event.dayTripId);
      })
    });
	}

  ngOnDestroy() {
    EmitterService.get(string.CREATE_TEMP_EVENT).unsubscribe();
  }

  createTempEvent() {
    EmitterService.get(string.CREATE_TEMP_EVENT).emit(true);
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
      }, err => {
        console.log(err);
        responded = true;
      })
  }

  private handleNewActivityDrop(event: EventActivity, dayTrip: DayTrip) {
    let newActivityPosition = this.findDropActivityPosition(dayTrip.activities, null);
    event.position = newActivityPosition;
    this.createEvent(event, dayTrip.id);
  }

  private handleActivityDrop(event: EventActivity, dayTrip: DayTrip) {
    let activityPosition = this.findDropActivityPosition(dayTrip.activities, event.id);
    let reorderParam: any = {
      activityId: event.id,
      position: activityPosition
    };
    if (dayTrip.id != event.dayTripId) {
      reorderParam.destDayTripId = dayTrip.id;
    }
    this.reorderEvent(reorderParam, event.dayTripId)
  }

  private findDropActivityPosition(activities: EventActivity[], targetActivityId?: number): number {
    for (var i=0; i<=activities.length; i++) {
      if (activities[i].id == targetActivityId) {
        // always take the position of the next element while not last
        if (i + 1 < activities.length) {
          return activities[i+1].position;
        }
        else {
          return activities[i-1].position + 1;
        }
      }
    }
  }

  private findDroppedDayTrip(activityId?: number): DayTrip {
    for (var dayTrip of this.dayTripList) {
      let activity = dayTrip.activities.find(x => x.id == activityId);
      if (activity != null) {
        return dayTrip;
      }
    }
    return null;
  }

  private createEvent(event: EventActivity, dayTripId: number) {
    let responded = false;
    this.activityService.createEvent(this.tripId, dayTripId, event)
      .takeWhile(() => !responded)
      .subscribe((resEvent: EventActivity) => {
        responded = true;
        console.log('responded', resEvent);
        let dayTrip = this.dayTripList.find(d => d.id == resEvent.dayTripId);
        let newEventIndex = dayTrip.activities.findIndex(a => a.id == null);
        dayTrip.activities[newEventIndex] = resEvent;
      },
      err => {
        responded = true;
        console.log(err);
      });
  }

  private reorderEvent(reorderParam, dayTripId: number) {
    let responded = false;
    this.activityService.reorderActivity(reorderParam, dayTripId, this.tripId)
      .takeWhile(() => !responded)
      .subscribe(resEvent => {
        let dayTrip = this.dayTripList.find(d => d.id == resEvent.dayTripId);
        let eventIndex = dayTrip.activities.findIndex(a => a.id == resEvent.id);
        dayTrip.activities[eventIndex] = resEvent;
        console.log('responded',resEvent);
        responded = true;
      },
      err => {
        responded = true;
        console.log(err);
      }
    );
  }

}
