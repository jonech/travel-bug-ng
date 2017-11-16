import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trip-users',
  templateUrl: 'trip_users.component.html',
  styleUrls: ['trip.component.scss']
})

export class TripUsersComponent implements OnInit
{
  goingUsers: Array<string>;
  displayUsers: Array<string>;
  maxDisplay: number = 4;
  totalHiddenUser: number = 0;

  constructor() {
    this.goingUsers = ["Alex May", "Tony Jaja", "Bob Adam", "Bruce Lee", "Santa Clause", "Ninja Turtle", "Bruce Wayne"];
  }

  ngOnInit() {

    this.displayUsers = this.goingUsers.slice(0, this.maxDisplay);
    if (this.goingUsers.length > this.maxDisplay) {
      this.totalHiddenUser = this.goingUsers.length - this.maxDisplay;
    }
  }
}
