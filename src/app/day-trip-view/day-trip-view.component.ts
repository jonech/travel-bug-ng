import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

import { Subject } from 'rxjs/Subject';
import { DayTripService } from '../services';
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
          <button class="activity-button"><i class="anticon anticon-plus"></i><br><span>Add Activity</span></button>
          <button class="activity-button"><i class="anticon anticon-plus"></i><br>Add Transport</button>
        </div>
      </div>
    </div>

  `
})
export class DayTripViewComponent implements OnInit {

  dayTripList: Array<DayTrip> = [];
  tripId: string;

  addDayTripLoading: boolean = false;

  dayTripId: string;
  numbers: Array<string> = new Array<string>();


	_currentDay: string; // display of current day on dropdown nav
	_show: boolean = false; // dropdown list show or not

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
    // for (var i=0; i<20; i++) {
    //   this.numbers.push(String(i));
    //   console.log(i);
    // }
    // console.log(this.numbers);
		// always close dropdown nav when navigated to another day
		this._show = false;
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

	showDropDown() {
		this._show = !this._show;
	}

  AddActivity() {
    if (this._currentDay == null) {
        return;
    }

    // var tempAcc = this.firebase.list(`/DayTrip/${this._currentDay}`).push({});
    // console.log(tempAcc.key);
    // //console.log(this.router.url);
    // console.log(`${this.router.url}/(pop-up:${tempAcc.key})`);
    // //this.router.navigate([{ outlets: { 'pop-up': [ tempAcc.key] }}]);
    // this.router.navigateByUrl(`${this.router.url}/(pop-up:${tempAcc.key})`);
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
