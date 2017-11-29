import { Component, OnInit } from '@angular/core';

import { EmitterService } from '../services/event-emitter.service';
import { Trip } from '../models/trip.model';

@Component({
	selector: 'dashboard',
  template: `

    <div nz-row [nzType]="'flex'" [nzJustify]="'end'" [nzAlign]="'bottom'" class="top-row">
      <div nz-col [nzSpan]="4">
        <a id="create-trip-button" class="right" (click)="openCreateTrip()">new trip+</a>
      </div>
    </div>
    <router-outlet></router-outlet>

    <create-trip-modal
      [isVisible]="isCreateTripOpen"
      (createTripClose)="closeCreateTrip()">
    </create-trip-modal>

    <!-- edit trip listen to trip component -->
    <edit-trip-modal></edit-trip-modal>
  `,
	styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit
{
  isCreateTripOpen: boolean = false;
  isEditTripOpen: boolean = false;
	private uid:string;

	constructor(
	){}

	ngOnInit() {
  }

	openCreateTrip() {
    this.isCreateTripOpen = true;
	}
	closeCreateTrip() {
		this.isCreateTripOpen = false;
  }

  openEditTrip() {
    this.isEditTripOpen = true;
  }
  closeEditTrip() {
    this.isEditTripOpen = false;
  }

}
