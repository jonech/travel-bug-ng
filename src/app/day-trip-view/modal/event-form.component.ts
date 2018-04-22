import {
  Component, OnInit,
  EventEmitter, Output,
  Input, ElementRef,
  ViewChild, NgZone,
  OnChanges, SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventActivity } from '../../models';

@Component({
	selector: 'event-form',
  template: `
    <form nz-form [nzType]="'vertical'" [formGroup]="eventForm">
      <!-- Event Name -->
      <div nz-form-item nz-row>
        <div nz-form-label nz-col>
          <label>Event Name</label>
        </div>
        <div nz-form-control nz-col [nzValidateStatus]="eventForm.controls.eventName">
          <nz-input formControlName="eventName" [nzPlaceHolder]="'Super Awesome Stuff'" [nzSize]="'large'">
          </nz-input>
          <div nz-form-explain *ngIf="eventForm.controls.eventName.dirty&&eventForm.controls.eventName.hasError('required')">
            Name your awesome activity!
          </div>
        </div>
      </div>

      <!-- Description -->
      <div nz-form-item nz-row>
        <div nz-form-label nz-col>
          <label nz-form-item>Description</label>
        </div>
        <div nz-form-control nz-col>
          <nz-input nzType="textarea" nzAutosize formControlName="description" [nzPlaceHolder]="'A brief description for this activity'" [nzSize]="'large'">
          </nz-input>
        </div>
      </div>

      <!-- Time -->
      <div nz-form-item nz-row>
        <div nz-form-label nz-col>
          <label nz-form-item>Time</label>
        </div>
        <div nz-form-control nz-col>
          <nz-timepicker formControlName="time" [nzSize]="'large'" [nzFormat]="'HH:mm'" [nzPlaceHolder]="'Pick a time'"></nz-timepicker>
        </div>
      </div>

      <div nz-form-item nz-row>
        <div nz-form-control nz-col [nzSpan]="12" [nzOffset]="6">
          <button nz-button (click)="submitForm()" [nzType]="'primary'" [nzSize]="'large'" [nzLoading]="isLoading">OK</button>
        </div>
      </div>
    </form>
  `
})

export class EventFormComponent implements OnInit, OnChanges
{
  eventForm: FormGroup;
  @Input() event: EventActivity;
	@Output() formSubmit = new EventEmitter<EventActivity>();
  isLoading: boolean = false;

	constructor(
		// private googleApi: MapsAPILoader,
    // private ngZone: NgZone,
    private fb: FormBuilder
  ) {
    this.event = new EventActivity();
  }

	ngOnInit()
	{
    this.eventForm = this.fb.group({
      eventName: [ null, [ Validators.required ] ],
      time: [ null ],
      description: [ null ]
    });
	}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.event != null) {
      if (this.eventForm != null && this.event != null) {
        this.updateForm(this.event);
      }
    }
  }

  submitForm() {
    for (const i in this.eventForm.controls) {
      this.eventForm.controls[ i ].markAsDirty();
    }
    if (this.eventForm.valid) {
      this.isLoading = true;
      let updated = new EventActivity(this.eventForm.value);
      updated.setTimeDate(this.eventForm.value.time);
      this.formSubmit.emit(updated);
    }
  }

  resetForm() {
    this.isLoading = false;
    this.eventForm.reset();
  }

  updateForm(event: EventActivity) {
    this.eventForm.controls['eventName'].setValue(event.eventName);

    if (event.description != null) {
      this.eventForm.controls['description'].setValue(event.description);
    }
    else {
      this.eventForm.controls['description'].setValue(null);
    }

    if (event.time != null) {
      this.eventForm.controls['time'].setValue(event.getTimeDate());
    }
    else {
      this.eventForm.controls['time'].setValue(null);
    }
  }
}
