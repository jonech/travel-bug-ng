import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MapsAPILoader } from 'angular2-google-maps/core';
import { Trip } from '../../models/trip.model';

@Component({
	selector: 'trip-form',
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
          <button nz-button (click)="submitForm()" [nzType]="'primary'" [nzSize]="'large'" [nzLoading]="isLoading">Submit</button>
        </div>
      </div>
    </form>
  `
})

export class TripFormComponent implements OnInit
{
  tripForm: FormGroup;
	@Output() formSubmit = new EventEmitter<Trip>();
  isLoading: boolean = false;

	constructor(
		// private googleApi: MapsAPILoader,
    // private ngZone: NgZone,
    private fb: FormBuilder
	){}

	ngOnInit()
	{
    this.tripForm = this.fb.group({
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

  submitForm() {
    for (const i in this.tripForm.controls) {
      this.tripForm.controls[ i ].markAsDirty();
    }
    if (this.tripForm.valid) {
      this.isLoading = true;
      this.formSubmit.emit(this.tripForm.value);
    }
  }

  resetForm() {
    this.isLoading = false;
    this.tripForm.reset();
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
