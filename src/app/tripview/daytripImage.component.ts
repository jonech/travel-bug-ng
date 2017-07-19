import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
//import { MapsAPILoader } from 'angular2-google-maps/core';
import { MapsAPILoader } from '@agm/core';
//import { GoogleService } from '../_service/google.service';

@Component({
	selector: 'day-trip-image',
	template: `
		<div id="slider" #image [ngStyle]="{'background-image': 'url(' +  (_imageUrl|async) + ')'}">
		<!--<div id="slider"></div>-->
	`,
	styleUrls: ['./daytripImage.component.css']
})

export class DayTripImageComponent implements OnChanges
{
	@Input() placeId: string;
	@ViewChild('image') image:ElementRef;

	_photoRef: string = "";
	_imageUrl: Promise<any>;

	constructor(
		//private google: GoogleService,
		private googleApiLoader: MapsAPILoader,
	)
	{
		// default random nice picture
		this._imageUrl = Promise.resolve('https://c1.staticflickr.com/8/7569/16091996407_28d437d745_b.jpg');
	}


	public ngOnChanges(changes: SimpleChanges)
	{
		if (changes['placeId']) {
			if (this.placeId != null) {
				this.getPhotoUrl(this.placeId, this.image);
			};
		}
	}


	getPhotoUrl(placeId: string, eleRef: ElementRef)
	{
		this.googleApiLoader.load().then(() => {
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
						var url = place.photos[0].getUrl({maxWidth: 1000, maxHeight: 400});

						this._imageUrl = Promise.resolve(url);
						console.log(this._imageUrl);
					}
				}
			})
		});
	}
}
