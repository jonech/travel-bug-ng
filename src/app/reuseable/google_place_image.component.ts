import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

import { GoogleService } from '../services/google.service'

@Component({
	moduleId: module.id,
	selector: 'google-place-image',
	template:
	`
		<img #image src="">
	`
})
export class GooglePlaceImageComponent implements OnInit
{
	@Input() placeId: string;
	@ViewChild('image') image: ElementRef;

	constructor(
		private google: GoogleService
	) {}

	ngOnInit()
	{
		if (this.placeId != null)
			this.google.getPhotoUrl(this.placeId, this.image);
	}
}
