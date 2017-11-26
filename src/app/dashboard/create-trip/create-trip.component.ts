import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, NgZone } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Trip } from '../../models/trip.model';

@Component({
	moduleId: module.id,
	selector: 'create-trip-component',
	templateUrl: 'create-trip.component.html',
	styleUrls: ['create-trip.component.css']
})

export class CreateTripComponent implements OnInit
{
	@Output() CloseSplash = new EventEmitter<any>();
	@Output() NewTrip = new EventEmitter<Trip>();

	@ViewChild('location') locationElement: ElementRef;
	@ViewChild('tripForm') tripFormElement: ElementRef;

	_error:string = "";
	trip: Trip = new Trip();

	constructor(
		private googleApi: MapsAPILoader,
		private ngZone: NgZone,
	){}

	ngOnInit()
	{
		this.googleApi.load().then(() => {
			let autocomplete = new google.maps.places.Autocomplete(this.locationElement.nativeElement, {
				types: ["geocode"]
			});

			autocomplete.addListener("place_changed", () => {
				this.ngZone.run(() => {
					let place: google.maps.places.PlaceResult = autocomplete.getPlace();

					if (place.geometry === undefined || place.geometry === null) {
						return;
					}
					// console.log(place.name);
					// console.log(place.place_id);

					this.trip.location = place.name;
					this.trip.tripLocationId = place.place_id;
				});
			});
		});
	}

	CloseCreateTrip()
	{
		this.CloseSplash.emit();
	}

	CreateTrip(tripNameElef:any, startElef:any, endElef:any)
	{
		// TODO: Need better param checking, with different case, for location
		// selected a location, but then cancel etc
		this._error = '';
		if (!endElef.value || !startElef.value) {
			this._error = 'Please fill in the dates.';
			return;
		}

		if (tripNameElef.value == '') {
			this._error = 'Please give it a trip name.';
			return;
		}

		if (this.trip.location == null) {
			this._error = 'Please insert a location.'
			return;
		}

		var startDate = new Date(startElef.value);
		var endDate = new Date(endElef.value);
		var numOfDays = this.dateDiffInDays(startDate, endDate) + 1;

		// +1 for month because January is 0
		this.trip.startDate = `${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`;
		this.trip.endDate = `${endDate.getDate()}/${endDate.getMonth()+1}/${endDate.getFullYear()}`;

		this.trip.tripName = tripNameElef.value;
		this.trip.numberOfDays = numOfDays.toString();

		this.NewTrip.emit(this.trip);
		this.tripFormElement.nativeElement.reset();
	}

	private dateDiffInDays(a:Date, b:Date): number
	{
		var _MS_PER_DAY = 1000 * 60 * 60 * 24;

		// Discard the time and time-zone information.
		var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
		var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

		return Math.floor((utc2 - utc1) / _MS_PER_DAY);
	}
}
