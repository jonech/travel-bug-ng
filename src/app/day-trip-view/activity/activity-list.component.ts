import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { EventActivity } from 'app/models/activity.model';
import { ActivityService } from 'app/services';
import { EmitterService } from 'app/services/event-emitter.service';
import * as string from 'app/shared/util/string.util';

@Component({
  selector: 'activity-list',
  template: `
    <div [dragula]="'bag-activity'"  [dragulaModel]="activities">
      <event attr.activity-id="{{ a.id }}" *ngFor="let a of activities; let j = index" [event]="a"></event>
    </div>
  `
})

export class ActivityListComponent implements OnInit {

  @Input() activities: Array<EventActivity> = [];
  @Input() tripId: number;
  @Input() dayTripId: number;

  constructor(
  ) {}

  ngOnInit() {
  }
}
