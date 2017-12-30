import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Subject } from 'rxjs/Subject';

import { TripFormComponent } from './trip-form.component';
import { TripService } from '../../services/trip.service';
import { EmitterService } from '../../services/event-emitter.service';
import { Trip } from '../../models';

@Component({
  selector: 'edit-trip-modal',
  template: `
    <nz-modal [nzVisible]="isVisible"
      [nzTitle]="'Editing Trip...'"
      [nzContent]="modalContent"
      [nzFooter]="null"
      (nzOnCancel)="handleCancel($event)">
      <ng-template #modalContent>
        <trip-form [trip]="trip" (formSubmit)="handleSubmit($event)"></trip-form>
      </ng-template>
      <ng-template #modalFooter>
      </ng-template>
    </nz-modal>
  `
})

export class EditTripModalComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  isVisible: boolean = false;
  trip: Trip = new Trip();
  @ViewChild(TripFormComponent) tripForm: TripFormComponent;

  constructor(
    private tripService: TripService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    EmitterService.get('[Trip] Edit')
      .takeUntil(this.ngUnsubscribe)
      .subscribe((trip: Trip) => {
        console.log(trip)
        this.trip = trip;
        this.isVisible = true;
      });
  }

  ngOnDestroy() {
    //EmitterService.get(String.EDIT_EVENT).unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  handleCancel(event) {
    this.isVisible = false;
  }

  handleSubmit(form: Trip) {
    form.id = this.trip.id;
    this.updateTrip(form);
  }

  private updateTrip(trip: Trip) {
    let responded = false;
    this.tripService.updateTrip(trip)
      .takeWhile(() => !responded)
      .subscribe(res => {
        this.tripForm.resetForm();
        this.isVisible = false;
        responded = true;
      },
      (error) => {
        console.log(error)
        this.notification.create('error', 'Error occur', error);
        this.tripForm.resetForm();
        this.isVisible = false;
        this.trip = null; // need to set trip to null to update onChanges
        responded = true;
      }
    );
  }
}
