import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MapsAPILoader } from 'angular2-google-maps/core';
import { Trip } from '../../models/trip.model';

@Component({
	moduleId: module.id,
	selector: 'create-trip-form',
  template: `
    <form nz-form [nzType]="'vertical'" [formGroup]="tripForm">
      <!-- Trip Name -->
      <div nz-form-item nz-row>
        <div nz-form-label nz-col>
          <label>Trip Name</label>
        </div>
        <div nz-form-control nz-col [nzValidateStatus]="tripForm.controls.tripName">
          <nz-input formControlName="tripName" [nzPlaceHolder]="'Awesome Trip'" [nzSize]="'large'">
          </nz-input>
          <div nz-form-explain *ngIf="tripForm.controls.tripName.dirty&&tripForm.controls.tripName.hasError('required')">Name your awesome trip!</div>
        </div>
      </div>

      <!-- Start Date -->
      <div nz-form-item nz-row>
        <div nz-form-label nz-col>
          <label nz-form-item>Start Date</label>
        </div>
        <div nz-form-control nz-col>
          <nz-datepicker formControlName="startDate" [nzSize]="'large'" [nzPlaceHolder]="'Select date'">
          </nz-datepicker>
        </div>
      </div>

      <!-- End Date -->
      <div nz-form-item nz-row>
        <div nz-form-label nz-col>
          <label nz-form-item>End Date</label>
        </div>
        <div nz-form-control nz-col>
          <nz-datepicker formControlName="endDate" [nzSize]="'large'" [nzPlaceHolder]="'Select date'">
          </nz-datepicker>
        </div>
      </div>

      <div nz-form-item nz-row>
        <div nz-form-control nz-col [nzSpan]="12" [nzOffset]="6">
          <button nz-button [nzType]="'primary'" [nzSize]="'large'">Submit</button>
        </div>
      </div>
    </form>
  `
})

export class CreateTripFormComponent implements OnInit
{
  tripForm: FormGroup;
	@Output() CloseSplash = new EventEmitter<any>();
	@Output() NewTrip = new EventEmitter<Trip>();

	@ViewChild('location') locationElement: ElementRef;
	@ViewChild('tripForm') tripFormElement: ElementRef;

	_error:string = "";
	trip: Trip = new Trip();

	constructor(
		// private googleApi: MapsAPILoader,
    // private ngZone: NgZone,
    private fb: FormBuilder
	){}

	ngOnInit()
	{
    this.tripForm = this.fb.group({
      formLayout: [ 'vertical' ],
      tripName: [ null, [ Validators.required ] ],
      startDate: [ null ],
      endDate: [ null ]
    });
		// this.googleApi.load().then(() => {
		// 	let autocomplete = new google.maps.places.Autocomplete(this.locationElement.nativeElement, {
		// 		types: ["geocode"]
		// 	});

		// 	autocomplete.addListener("place_changed", () => {
		// 		this.ngZone.run(() => {
		// 			let place: google.maps.places.PlaceResult = autocomplete.getPlace();

		// 			if (place.geometry === undefined || place.geometry === null) {
		// 				return;
		// 			}
		// 			// console.log(place.name);
		// 			// console.log(place.place_id);

		// 			this.trip.location = place.name;
		// 			this.trip.tripLocationId = place.place_id;
		// 		});
		// 	});
		// });
	}

	CloseCreateTrip() {
		this.CloseSplash.emit();
	}

  submitForm() {
    for (const i in this.tripForm.controls) {
      this.tripForm.controls[ i ].markAsDirty();
    }
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
