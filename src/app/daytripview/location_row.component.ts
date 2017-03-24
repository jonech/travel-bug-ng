import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import { MapsAPILoader } from 'angular2-google-maps/core';

@Component({
	selector: 'location-row',
	template:
	`
		<a [routerLink]="[{ outlets: { 'pop-up':[_activityId] } }]">
			<div class="span_10 col">{{ _location.time }}</div>

			<div #image [style.background-image]="getBackgroundImageUrl()" class="span_20 col circle-md">
			</div>

			<div class="span_60 col">
				{{ _location.eventName }}
				<br>
				{{ _location.location.name }}
				<br>
				{{ _location.description }}
			</div>
		</a>
	`,
	styleUrls: ['./location_row.component.css'],
})

export class LocationRowComponent implements OnInit
{
	@Input('location') _location: any;
	@Input('activityId') _activityId: string;
	@ViewChild('image') image;
	private _imageUrl: string;

	constructor(
		private googleAPILoader: MapsAPILoader,
		private sanitizer: DomSanitizer,
	)
	{}

	ngOnInit()
	{
		if (this._location.location.id != null)
			this.getImageUrl(this._location.location.id, this.image);
			//this._imageUrl = 'https://cache-graphicslib.viator.com/graphicslib/thumbs360x240/10175/SITours/french-riviera-day-trip-from-nice-in-nice-289164.jpg';
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
