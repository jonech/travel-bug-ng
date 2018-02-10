import { Component, OnInit, Input } from '@angular/core';

import { DayTripService } from 'app/services';
import { DayTrip } from 'app/models';

@Component({
  selector: 'day-trip-title',
  styleUrls: ['day-trip-title.component.scss'],
  template:
  `
    <div class="day-trip-name">
      <div [hidden]="isEditTitle">
        <h2>{{ dayTrip.dayTripName }} {{ dayTrip.date }}
          <span class="line-text"><i class="anticon anticon-edit tools" (click)="editDayTripTitle()"></i></span>
        </h2>
      </div>

      <div [hidden]="!isEditTitle">
        <nz-input
          [(ngModel)]="dayTrip.dayTripName"
          [nzPlaceHolder]="'Day Trip Name'"
          [nzSize]="'large'">
        </nz-input>

        <div class="button-row">
          <button nz-button [nzType]="'default'" (click)="cancelEdit()">
            <span>Cancel</span>
          </button>

          <button nz-button [nzType]="'default'" (click)="confirmEdit()"  [nzLoading]="isLoading">
            <span>OK</span>
          </button>

        </div>
      </div>
    </div>
  `
})
export class DayTripTitleComponent implements OnInit {

  @Input() dayTrip: DayTrip;
  isEditTitle: boolean = false;
  isLoading: boolean = false;
  private _previousDayTripTitle: string;

  constructor(
    private dayTripService: DayTripService
  ) { }

  ngOnInit() {
    console.log(this.dayTrip);
    this._previousDayTripTitle = this.dayTrip.dayTripName;
  }

  editDayTripTitle() {
    this.isEditTitle = true;
  }

  cancelEdit() {
    this.dayTrip.dayTripName = this._previousDayTripTitle;
    this.isEditTitle = false;
  }

  confirmEdit() {
    this.isLoading = true;

    this.dayTripService.updateDayTrip(this.dayTrip.tripId, this.dayTrip)
      .subscribe((res) => {
        this._previousDayTripTitle = this.dayTrip.dayTripName;
        this.isLoading = false;
        this.isEditTitle = false;
      }, err => {
        this.dayTrip.dayTripName = this._previousDayTripTitle;
        this.isLoading = false;
        this.isEditTitle = false;
      });
  }
}
