import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import { FirebaseListObservable, AngularFire } from 'angularfire2'
import { MapsAPILoader } from 'angular2-google-maps/core';

@Component({
	selector: 'location-row',
	template:
	`
		<a [routerLink]="[{ outlets: { 'pop-up':[_activityId] } }]">
			<div class="section group row">
				<div class="span_10 col">{{ _location.time }}</div>

				<div #image [style.background-image]="getBackgroundImageUrl()" class="col circle-md">
				</div>

				<div class="span_70 col">
					{{ _location.eventName }}
					<br>
					{{ _location.location.name }}
					<br>
					{{ _location.description }}
					<br>
					<i class="fa fa-thumbs-up" aria-hidden="true"></i>{{ (_upVotes | async)?.length }}
					<i class="fa fa-thumbs-down" aria-hidden="true"></i>{{ (_downVotes | async)?.length }}
					<i class="fa fa-commenting" aria-hidden="true"></i>{{ (_comments | async)?.length }}
				</div>
			</div>
		</a>

	`,
	styleUrls: ['./location_row.component.css'],
})

export class LocationRowComponent implements OnInit
{
	@Input('location') _location: any;
	@Input('activityId') _activityId: string;
	@Input('dayTripId') _dayTripId : string;
	@ViewChild('image') image;
	private _imageUrl: string;

	private _comments: FirebaseListObservable<any[]>;
	private _upVotes: FirebaseListObservable<any[]>;
	private _downVotes: FirebaseListObservable<any[]>;

	constructor(
		private googleAPILoader: MapsAPILoader,
		private sanitizer: DomSanitizer,
		private firebase: AngularFire
	)
	{}

	ngOnInit()
	{
		if (this._location.location.id != null)
			this.getImageUrl(this._location.location.id, this.image);

		this._comments = this.firebase.database.list(`/DayTrip/${this._dayTripId}/${this._activityId}/Comments`)

		this._upVotes = this.firebase.database.list(`/DayTrip/${this._dayTripId}/${this._activityId}/Votes`,
			{ query: {
				orderByValue: true,
				equalTo: 'true'
			}});

		this._downVotes = this.firebase.database.list(`/DayTrip/${this._dayTripId}/${this._activityId}/Votes`,
			{ query: {
				orderByValue: true,
				equalTo: 'false'
			}})
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
