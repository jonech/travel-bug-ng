import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { GoogleService } from '../_service/google.service';
import { GetCurrentDateTime } from '../_util/datetime.util';

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

	_display: boolean = true;
	_activity: FirebaseObjectObservable<any>;
	_upVotes: FirebaseListObservable<any[]>;
	_downVotes: FirebaseListObservable<any[]>;
	_comments: FirebaseListObservable<any[]>;

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

			this._comments = this.firebase.database.list(`/DayTrip/${this.dayTripId}/${this.activityId}/Comments`)

			this._upVotes = this.firebase.database.list(`/DayTrip/${this.dayTripId}/${this.activityId}/Votes`,
				{ query: {
					orderByValue: true,
					equalTo: 'true'
				}});

			this._downVotes = this.firebase.database.list(`/DayTrip/${this.dayTripId}/${this.activityId}/Votes`,
				{ query: {
					orderByValue: true,
					equalTo: 'false'
				}})
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

    HandleTitleChange(changes)
    {
        this.firebase.database.object(`/DayTrip/${this.dayTripId}/${this.activityId}`).update({eventName: changes});
    }

    HandleDescriptionChange(changes)
    {
        this.firebase.database.object(`/DayTrip/${this.dayTripId}/${this.activityId}`).update({description: changes});
    }

    HandleCommentCreate(comment)
    {
        this.firebase.auth.subscribe(user => {
            // push to comment table
            var tempComment = this.firebase.database.list(`/Comment`).push({
                activityId : this.activityId, // match with corresponding activity
                comment : comment,
                date : GetCurrentDateTime(),
                userId: user.uid,
            });

            // add to daytrip as reference
            this.firebase.database.object(`/DayTrip/${this.dayTripId}/${this.activityId}/Comments/${tempComment.key}`).set(user.uid);
        })
    }
}
