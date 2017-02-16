import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Location } from '../_model/location.model';

@Component({
	selector: 'day-trip-view',
	templateUrl: './daytripview.component.html',
	styleUrls: ['./daytripview.component.css']
})

export class DayTripViewComponent implements OnInit
{
	_dayTripId: string;
	_locationSearchControl: FormControl;
	newLocation: Location;

	dayTripRef: FirebaseListObservable<any[]>;

	@ViewChild('location') locationElement: ElementRef;
	@ViewChild('activityForm') locationForm: ElementRef;

	constructor(
		private route: ActivatedRoute,
		private googleApiLoader: MapsAPILoader,
		private ngZone: NgZone,
		private firebase: AngularFire
	){}

	ngOnInit()
	{
		this.route.params.subscribe(params => {
			this._dayTripId = params['id'];
			this.dayTripRef = this.firebase.database.list(`/DayTrip/${this._dayTripId}`);
		});

		this._locationSearchControl = new FormControl();

		this.googleApiLoader.load().then(() => {
			let autocomplete = new google.maps.places.Autocomplete(this.locationElement.nativeElement, {
				types: ["establishment"]
			});

			autocomplete.addListener("place_changed", () => {
				this.ngZone.run(() => {
					let place: google.maps.places.PlaceResult = autocomplete.getPlace();

					if (place.geometry === undefined || place.geometry === null) {
						return;
					}
					console.log(place.name);
					console.log(place.geometry.location.lat());
					console.log(place.geometry.location.lng());
					console.log(place.formatted_address);
					console.log(place.place_id);

					this.newLocation = {
						location: {
							address: place.formatted_address,
							lat: place.geometry.location.lat(),
							lng: place.geometry.location.lng(),
							id: place.place_id,
							name: place.name
						}
					}
				});
			});
		});
	}

	createActivity(actname:any, time:any, desc:any)
	{
		if (actname.value == null || time.value == null) {
			return;
		}

		if (this.newLocation == null) {
			return;
		}
		this.newLocation.time = time.value;
		this.newLocation.timeSort = this.getTimeSort(time.value);
		this.newLocation.description = desc.value;
		this.newLocation.eventName = actname.value;

		this.dayTripRef.push(this.newLocation);
		this.locationForm.nativeElement.reset();
	}

	getTimeSort(time:string): number
	{
		let hour = time.slice(0, 2);
		let minute = time.slice(3, 5);

		return Number("42"+hour+minute);
	}
}
