import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
	selector: 'firebase-place-image',
	template:
	`
		<img [src]="sanitize( (_placeImage|async)?.image )">
	`
})
export class FirebasePlaceImageComponent implements OnInit {

	@Input() placeId: string;
	_placeImage: FirebaseObjectObservable<any>;

	constructor(
		private firebase: AngularFire,
		private sanitizer: DomSanitizer
	){}

	ngOnInit()
	{
		if (this.placeId == null) {
			console.log("nulllll");
			return;
		}
		console.log(this.placeId);
		this._placeImage = this.firebase.database.object(`/Location/${this.placeId}`);
	}

	sanitize(base64Image: string)
	{
		if (base64Image == null) {
			return 'https://melbournebitsandpieces.files.wordpress.com/2010/08/sany0251.jpg';
		}

		// disable this return if loading dashboard is slow and annoying, just return the static url image from web...
		return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + base64Image);
		//return 'https://melbournebitsandpieces.files.wordpress.com/2010/08/sany0251.jpg';
	}
}
