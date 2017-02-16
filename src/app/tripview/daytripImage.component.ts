import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';

import { GoogleService } from '../_service/google.service';

@Component({
	selector: 'day-trip-image',
	template: `
		<div id="slider">
			<figure>
				<img #image src="">
			</figure>
		</div>
	`,
	styleUrls: ['./daytrip.component.css', './daytriplist.component.css', '../dashboard/dashboard.component.css'],
})

export class DayTripImageComponent implements OnChanges
{
	@Input() placeId: string;
	@ViewChild('image') image:ElementRef;

	private _photoRef: string = "";
	private _imageUrl: string;

	constructor(
		private google: GoogleService,
	){}


	public ngOnChanges(changes: SimpleChanges)
	{
		if (changes['placeId']) {
			if (this.placeId != null) {
				this.google.getPhotoUrl(this.placeId, this.image);
			};
		}
	}

	private isEmptyObject(obj)
	{
		return Object.keys(obj).length === 0;
	}
}
