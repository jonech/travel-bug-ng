import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router'
import { NzModalService } from 'ng-zorro-antd';

import { Trip } from 'app/models';
import { TripService } from 'app/services/trip.service';
import { EmitterService } from 'app/services/event-emitter.service';
@Component({
	selector: 'trip',
  styleUrls: ['trip.component.scss'],
  template: `
  <div nz-col [nzXs]="24" [nzSm]="24" [nzMd]="8" [nzLg]="8" [nzXl]="8" class="card-wrapper">
    <nz-card class="card" (click)="onClick($event, 'Trip')">
      <ng-template #body>
        <div class="card-top">
          <img alt="example" src="https://i.pinimg.com/736x/f7/ba/65/f7ba654d396fc5b904ccc2c2532435a5--eerie-photography-creative-photography.jpg"/>
        </div>

        <div class="tool-button">
          <button nz-button (click)="onClick($event, 'Edit')" [nzSize]="large"><i class="anticon anticon-edit"></i></button>
          <button nz-button (click)="onClick($event, 'Delete')" [nzSize]="large"><i class="anticon anticon-delete"></i></button>
        </div>

        <div class="date-box">
          <p class="date">{{ trip.startDate | date:'d' }}</p>
          <p class="month">{{ trip.startDate | date:'MMM' }}</p>
        </div>

        <div class="card-bottom">
          <div class="trip-heading">
            <p class="trip-title">{{ trip.tripName || "Unamed Trip" }}</p>
            <p class="trip-date">{{ trip.startDate | date:'MMM d' }} - {{ trip.endDate | date:'MMM d' }} </p>
          </div>
          <trip-users [tripPermissions]="trip.tripPermissions"></trip-users>
        </div>
      </ng-template>
    </nz-card>
  </div>
  `
})

export class TripComponent implements OnInit {
	@Input() trip: Trip;

	constructor(
    private router: Router,
    private modalService: NzModalService,
    private tripService: TripService
	){}

	ngOnInit() {
    console.log(this.trip);
	}

  onClick(event: Event, button: string) {
    event.stopPropagation();

    switch (button) {
      case 'Trip':
        this.toTripActivity();
        break;
      case 'Delete':
        this.deleteTrip();
        break;
      case 'Edit':
        this.editTrip();
        break;
      default:
        break;
    }
  }

  toTripActivity() {
    if (this.trip.id != null) {
			this.router.navigate(['/daytrip', this.trip.id]);
		}
  }

  deleteTrip() {
    this.modalService.confirm({
      title: 'Deleting trip',
      content: 'Are you sure you want to delete this trip?',
      okText: 'OK',
      cancelText: 'Cancel',
      showConfirmLoading: true,
      onOk: () => {
        let responded = false;
        this.tripService.deleteTrip(this.trip.id)
          .takeWhile(() => !responded)
          .subscribe(() => {
            responded = true;
            console.log('deleted');
          },
          err => console.log(err)
        );
      }
    });
  }

  editTrip() {
    EmitterService.get('[Trip] Edit').emit(this.trip);
  }
}
