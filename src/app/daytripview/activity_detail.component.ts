import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
	moduleId: module.id,
	selector: 'activity-detail',
	template:
	`
		<p-dialog [modal]=true [dismissableMask]=true [visible]="_display">
			<p-header>
				<div style="float: right; color: red;" class="close"><a [routerLink]="[parentRoute(), { outlets: { 'pop-up': null }}]">CLOSE</a></div>
			</p-header>
    		<p>
				{{ (_activity | async)?.description }}
			</p>
		</p-dialog>
	`,
	styles: ['./activity_detail.component.css']
})

export class ActivityDetailComponent implements OnInit
{

	private _display: boolean = true;
	private _activity: FirebaseObjectObservable<any>;

	private dayTripId: string;
	private tripId: string;
	private activityId: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private firebase: AngularFire,
	)
	{}

	ngOnInit()
	{
		this.route.parent.params.subscribe(params => {
			this.dayTripId = params['dayTripId'];
			this.tripId = params['tripId'];
		});

		this.route.params.subscribe(params => {
			this.activityId = params['activityId'];
			this._activity = this.firebase.database.object(`/DayTrip/${this.dayTripId}/${this.activityId}`);
		});
	}

	parentRoute()
	{
		return `/daytrip/${this.tripId}/${this.dayTripId}`;
	}
}
