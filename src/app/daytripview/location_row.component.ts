import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { MapsAPILoader } from 'angular2-google-maps/core';
import { MapsAPILoader } from '@agm/core';

@Component({
	selector: 'location-row',
	template:
	`

        <div class="section group row">
            <a [routerLink]="[{ outlets: { 'pop-up':[_activityId] } }]">
                <div id="time" class="span_10 col">{{ _location.time }}</div>

                <div #image [style.background-image]="getBackgroundImageUrl()" class="col circle-md">
                </div>

                <div class="col span_70 text-col">
                    <div class="section group text-row">
                        <div class="title">
                            <span id="eventname">{{ _location.eventName }}</span>
                            <span id="location">{{ _location.location?.name }}</span>
                        </div>
                        <div id="description">
                            {{ _location.description }}
                        </div>
                    </div>
                    <div class="section group tool-row">
                        <span [ngClass]="{'upvoted': upvoted}">
                            <i class="fa fa-smile-o" (click)="Upvote(); false" aria-hidden="false"></i>
                            {{ (_upVotes | async)?.length }}
                        </span>
                        <span [ngClass]="{'downvoted': downvoted}">
                            <i class="fa fa-frown-o" (click)="Downvote(); false" aria-hidden="false"></i>
                            {{ (_downVotes | async)?.length }}
                        </span>
                        <span [ngClass]="{'commented': commented}">
                            <i class="fa fa-commenting" aria-hidden="false"></i>
                            {{ (_comments | async)?.length }}
                        </span>
                    </div>
                </div>
            </a>
        </div>

	`,
	styleUrls: ['./location_row.component.css'],
})

export class LocationRowComponent implements OnInit
{
	@Input('location') _location: any;
	@Input('activityId') _activityId: string;
	@Input('dayTripId') _dayTripId : string;
	@ViewChild('image') image;
	_imageUrl: string;

	_comments: FirebaseListObservable<any[]>;
	_upVotes: FirebaseListObservable<any[]>;
	_downVotes: FirebaseListObservable<any[]>;

    upvoted: boolean;
    downvoted: boolean;
    voteable: boolean = false;
    commented: boolean;

	constructor(
		private googleAPILoader: MapsAPILoader,
		private sanitizer: DomSanitizer,
        private firebase: AngularFireDatabase,
        private afAuth: AngularFireAuth
	)
	{}

	ngOnInit()
	{
		if (this._location.location != null && this._location.location.id != null)
			this.getImageUrl(this._location.location.id, this.image);

		this._comments = this.firebase.list(`/DayTrip/${this._dayTripId}/${this._activityId}/Comments`)

		this._upVotes = this.firebase.list(`/DayTrip/${this._dayTripId}/${this._activityId}/Votes`,
			{ query: {
				orderByValue: true,
				equalTo: 'true'
			}});

		this._downVotes = this.firebase.list(`/DayTrip/${this._dayTripId}/${this._activityId}/Votes`,
			{ query: {
				orderByValue: true,
				equalTo: 'false'
			}});

        this.CheckUpDownVoteComment();
	}

    CheckUpDownVoteComment()
    {
        this.afAuth.authState.subscribe((user) => {

            this.firebase.object(`/DayTrip/${this._dayTripId}/${this._activityId}/Votes/${user.uid}`, {
                preserveSnapshot: true
            }).subscribe(snapshot => {
                if (snapshot.val() == "true") {
                    this.upvoted = true;
                    this.voteable = true;
                }
                else if (snapshot.val() == "false") {
                    this.downvoted = true;
                    this.voteable = true;
                }
                else {
                    this.voteable = true;
                }
            });

            this.firebase.list(`/DayTrip/${this._dayTripId}/${this._activityId}/Comments`, {
                preserveSnapshot: true,
                query: {
                    orderByValue: true,
                    equalTo: user.uid
                }
            }).subscribe(snapshots => {
                if (snapshots.length > 0) {
                    this.commented = true;
                }
            });
        });
    }

    Upvote()
    {
        if (this.voteable) {
            this.afAuth.authState.subscribe((user) => {
                this.firebase.object(`/DayTrip/${this._dayTripId}/${this._activityId}/Votes/${user.uid}`).set("true");
            });
        }
    }

    Downvote()
    {
        if (this.voteable) {
            this.afAuth.authState.subscribe((user) => {
                this.firebase.object(`/DayTrip/${this._dayTripId}/${this._activityId}/Votes/${user.uid}`).set("false");
            });
        }
    }

	getImageUrl(placeId: string, eleRef: ElementRef)
	{
		this.googleAPILoader.load().then(() => {
			let service = new google.maps.places.PlacesService(eleRef.nativeElement);
			var request = {
				placeId: placeId,
			};

			service.getDetails(request, (place, status) => {
				if (status == google.maps.places.PlacesServiceStatus.OK) {

					// places with no photos
					if (!place.hasOwnProperty('photos')) {
						console.log(place);
						let ref = place.html_attributions;
						console.log(ref);
						//image.nativeElement.src = `${this.baseUrl}?maxwidth=400&photoreference=${place.reference}`
					}
					else {
						var url = place.photos[0].getUrl({maxWidth: 200, maxHeight: 200});

						this._imageUrl = url;
					}
				}
			})
		});
	}

	getBackgroundImageUrl()
	{
		if (this._imageUrl) {
			return this.sanitizer.bypassSecurityTrustStyle(`url('${this._imageUrl}')`);
		}
		else {
			return ""
		}
	}

}
