import { Component, OnInit, Input } from '@angular/core';
import { TripPermission } from '../../models';

@Component({
  selector: 'trip-users',
  templateUrl: 'trip-users.component.html',
  styleUrls: ['../trip/trip.component.scss']
})

export class TripUsersComponent implements OnInit
{
  @Input() tripPermissions: TripPermission[];

  //goingUsers: Array<Trip>;
  display: Array<TripPermission>;
  maxDisplay: number = 4;
  totalHidden: number = 0;

  constructor() {
    // this.goingUsers = ["Alex May", "Tony Jaja", "Bob Adam", "Bruce Lee", "Santa Clause", "Ninja Turtle", "Bruce Wayne"];
  }

  ngOnInit() {
    if (this.tripPermissions == null) {
      return;
    }

    this.display = this.tripPermissions.slice(0, this.maxDisplay);
    if (this.tripPermissions.length > this.maxDisplay) {
      this.totalHidden = this.tripPermissions.length - this.maxDisplay;
    }
  }
}
