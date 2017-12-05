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
      <div nz-col [nzSpan]="6">
        <!--<div class="left-side-bar">
          <ul nz-menu [nzMode]="'inline'" style="height:100%">
            <li *ngFor="let n of numbers">Day{{n}}</li>
          </ul>
        </div>-->
        <day-list (createDayTripClick)="createDayTrip()" [data]="dayTripList"></day-list>
      </div>

      <div nz-col [nzSpan]="12">
        <div *ngFor="let d of dayTripList" class="day-trip">
          <span [id]="d.getDayTripNameTag()" ></span>
          <h4>{{ d.dayTripName }}</h4>
          <p>Some sstuff....</p>
          <p>{{ d.date }}</p>
        </div>
      </div>

      <div nz-col [nzSpan]="6">
        col-12
      </div>
    </div>

  `
})
export class DayTripViewComponent implements OnInit {
	tripId: string;
  dayTripId: string;
  numbers: Array<string> = new Array<string>();
  dayTripList: Array<DayTrip> = [];

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
    this.dayTripService.createDayTrip(this.tripId, null)
      .takeWhile(() => !responded)
      .subscribe(res => {

        responded = true;

      })
  }
}
