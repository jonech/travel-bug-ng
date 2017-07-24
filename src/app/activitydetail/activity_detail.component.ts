import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { GoogleService } from '../_service/google.service';
import { GetCurrentDateTime, GetTimeSort } from '../_util/datetime.util';

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

    upvoted: boolean;
    downvoted: boolean;
    voteable: boolean = false;

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
            console.log(params['dayTripId']);
            console.log(params['tripId']);
			this.dayTripId = params['dayTripId'];
			this.tripId = params['tripId'];
		});

		this.route.params.subscribe(params => {
			this.activityId = params['activityId'];
            console.log(params['activityId']);
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
            }});

            this.CheckUpDownVote();
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
        //console.log(event.target);
		if (!this.container.nativeElement.contains(event.target)) {
            // console.log(event.target);
            // console.log("closing!!!");
            // remove closing pop up when clicking outside region
            // not working well when clicking on google place dropdown
			//this.closePopUp();
		}
	}

	getImageUrl(placeId: string)
	{
		this.google.getPhotoUrl(placeId, this.image);
	}

    CheckUpDownVote()
    {
        this.firebase.auth.subscribe((user) => {

            this.firebase.database.object(`/DayTrip/${this.dayTripId}/${this.activityId}/Votes/${user.uid}`, {
                preserveSnapshot: true
            }).subscribe(snapshot => {
                if (snapshot.val() == "true") {
                    this.upvoted = true;
                    this.downvoted = false;
                    this.voteable = true;
                }
                else if (snapshot.val() == "false") {
                    this.downvoted = true;
                    this.upvoted = false;
                    this.voteable = true;
                }
                else {
                    this.voteable = true;
                }
            });
        });
    }

    Upvote()
    {
        if (this.voteable) {
            this.firebase.auth.subscribe((user) => {
                this.firebase.database.object(`/DayTrip/${this.dayTripId}/${this.activityId}/Votes/${user.uid}`).set("true");
            });
        }
    }

    Downvote()
    {
        if (this.voteable) {
            this.firebase.auth.subscribe((user) => {
                this.firebase.database.object(`/DayTrip/${this.dayTripId}/${this.activityId}/Votes/${user.uid}`).set("false");
            });
        }
    }

    HandleTimeChange(changes)
    {
        var time = changes;
        var timesort = GetTimeSort(time);
        this.firebase.database.object(`/DayTrip/${this.dayTripId}/${this.activityId}`).update({time: time, timeSort: timesort});
        //console.log(changes);
    }

    HandleTitleChange(changes)
    {
        this.firebase.database.object(`/DayTrip/${this.dayTripId}/${this.activityId}`).update({eventName: changes});
    }

    HandleLocationChange(changes)
    {
        //console.log(changes);
        this.firebase.database.object(`/DayTrip/${this.dayTripId}/${this.activityId}/location`).update(changes);
    }

    HandleDescriptionChange(changes)
    {
        this.firebase.database.object(`/DayTrip/${this.dayTripId}/${this.activityId}`).update({description: changes});
    }

    HandleCommentCreate(comment)
    {
        this.CheckLocationNull((location) => {
            if (location) {
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
                });
            }
        });
    }


    /* need activity to have a location, otherwise wont be listed out on list because thats how we differentiate location and transport */
    CheckLocationNull(x: (location: boolean) => void)
    {
        this.firebase.database.object(`/DayTrip/${this.dayTripId}/${this.activityId}/location`, {
            preserveSnapshot: true
        }).subscribe(snapshot => {
            console.log(snapshot.val());
            if (snapshot.val() == null || snapshot.val() == '') {
                x(false);
            }
            else {
                x(true);
            }
        })
    }
}
