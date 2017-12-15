import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { EventActivity } from 'app/models';
import { ActivityService, EmitterService } from 'app/services';
import * as String from 'app/shared/util/string.util';

@Component({
  selector: 'event',
  styleUrls: ['event.component.scss'],
  template: `
    <div nz-col [nzSpan]="24" class="card-wrapper">
      <nz-card class="card">
        <ng-template #body>
          <div nz-row [nzType]="'flex'" [nzAlign]="'middle'">
            <div nz-col [nzSpan]="3"><div class="time">{{ event.time }}</div></div>
            <div nz-col [nzSpan]="5">
              <div class="location-img"></div>
            </div>
            <div nz-col [nzSpan]="16">
              <h4 class="event-name">{{ event.eventName }}</h4>
              <p class="description">{{ event.description }}</p>
            </div>
          </div>
          <div class="tools">
            <div class="setting" (click)="editEvent()"><i class="anticon anticon-edit"></i></div>
          </div>
        </ng-template>
      </nz-card>
    </div>
  `
})

export class EventComponent implements OnInit {

  coolStuff = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.";

  @Input() event: EventActivity;

  constructor() { }

  ngOnInit() { }

  editEvent() {
    EmitterService.get(String.EDIT_EVENT).emit(this.event);

    let responded = false;
    EmitterService.get(String.EDIT_EVENT_SUBMIT)
      .takeWhile(() => !responded)
      .subscribe((event) => {
        if (event == null) {
          responded = true;
          return;
        }
        this.event = event;
      });
  }
}
