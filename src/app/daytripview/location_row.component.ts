import { Component, Input, ViewChild, OnInit} from '@angular/core';
import { GoogleService } from '../_service/google.service';

@Component({
	selector: 'location-row',
	template:
	`
		<a [routerLink]="[{ outlets: { 'pop-up':[_activityId] } }]">
			<div class="span_10 col">{{ _location.time }}</div>

			<div [ngStyle]="{'background-image': 'url(' + _imageUrl + ')'}" class="span_20 col circle-md">
				<!--<img #image src="https://cache-graphicslib.viator.com/graphicslib/thumbs360x240/10175/SITours/french-riviera-day-trip-from-nice-in-nice-289164.jpg"/>-->
			</div>

			<div class="span_60 col">
				{{ _location.eventName }}
				<br>
				{{ _location.location.name }}
				<br>
				{{ _location.description }}
			</div>
		</a>
	`
})

export class LocationRowComponent implements OnInit
{
	@Input('location') _location: any;
	@Input('activityId') _activityId: string;
	@ViewChild('image') image;
	private _imageUrl: string;

	constructor(
		private google: GoogleService
	)
	{}

	ngOnInit()
	{
		if (this._location.location.id != null)
			//this._imageUrl = this.google.getImageUrl(this._location.location.id, this.image);
			this._imageUrl = 'https://cache-graphicslib.viator.com/graphicslib/thumbs360x240/10175/SITours/french-riviera-day-trip-from-nice-in-nice-289164.jpg';
	}

}
