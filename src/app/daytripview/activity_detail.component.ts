import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { GoogleService } from '../_service/google.service';

@Component({
	selector: 'activity-detail',
	templateUrl: './activity_detail.component.html',
	styleUrls:['./activity_detail.component.css'],
	host: {
		'(document:click)': 'handleClick($event)'
	}
})

export class ActivityDetailComponent implements OnInit
{
	@ViewChild('container') container;
	@ViewChild('image') image: ElementRef;

	private _display: boolean = true;
	private _activity: FirebaseObjectObservable<any>;

	private dayTripId: string;
	private tripId: string;
	private activityId: string;
	private firstclick: boolean = true;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private firebase: AngularFire,
		private elementRef: ElementRef,
		private google: GoogleService,
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

	closePopUp()
	{
		this.router.navigate([`/daytrip/${this.tripId}/${this.dayTripId}`, { outlets: { 'pop-up': null }}]);
	}

	handleClick(event)
	{
		// prevent pop up closing too soon
		if (this.firstclick) {
			this.firstclick = false;
			return;
		}

		if (!this.container.nativeElement.contains(event.target)) {
			this.closePopUp();
		}
	}

	getImageUrl(placeId: string)
	{
		this.google.getPhotoUrl(placeId, this.image);
	}
}
