import { Component, OnInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Location } from '../_model/location.model';

import { getTimeSort } from '../_util/timesort.util';

@Component({
	moduleId: module.id,
	selector: 'location-form',
	templateUrl: 'location_form.component.html'
})

export class LocationFormComponent implements OnInit
{
	@Input() dayTripId: string;
	_locationSearchControl: FormControl;
	newLocation: Location;

	dayTripRef: FirebaseListObservable<any[]>;

	@ViewChild('location') locationElement: ElementRef;
	@ViewChild('activityForm') locationForm: ElementRef;

	constructor(
		private googleApiLoader: MapsAPILoader,
		private ngZone: NgZone,
		private firebase: AngularFire
	) { }

	ngOnInit()
	{
		this.dayTripRef = this.firebase.database.list(`/DayTrip/${this.dayTripId}`);
		console.log("here");
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
		this.newLocation.timeSort = getTimeSort(time.value);
		this.newLocation.description = desc.value;
		this.newLocation.eventName = actname.value;

		this.dayTripRef.push(this.newLocation);
		this.locationForm.nativeElement.reset();
	}
}
