import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core'

@Component({
	moduleId: module.id,
	selector: 'small-round-image',
	template:
	`
		<div #image class="circle-sm" [ngStyle]="{'background-image': 'url(' +  (_imageUrl|async) + ')'}"></div>
	`,
	styleUrls: ['./small_round_image.component.css']
})
export class SmallRoundImageComponent implements OnInit
{
	@Input() placeId: string;
	@ViewChild('image') image: ElementRef;

	 _imageUrl: Promise<any>;

	constructor(
		private googleApiLoader: MapsAPILoader
	)
	{
		this._imageUrl = Promise.resolve('https://melbournebitsandpieces.files.wordpress.com/2010/08/sany0251.jpg');
	}

	ngOnInit()
	{
		if (this.placeId != null)
			this.getPhotoUrl(this.placeId, this.image);
	}

	getPhotoUrl(placeId: string, image: ElementRef)
	{
		this.googleApiLoader.load().then(() => {
			let service = new google.maps.places.PlacesService(image.nativeElement);
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
					}
					else {
						var url = place.photos[0].getUrl({maxWidth: 100, maxHeight: 100});
						this._imageUrl = Promise.resolve(url);
					}
				}
			})
		});
	}
}
