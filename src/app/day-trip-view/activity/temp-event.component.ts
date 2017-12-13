import { Component, OnInit, Input } from '@angular/core';
import { EventActivity } from 'app/models/activity.model';
import { EmitterService } from 'app/services/event-emitter.service';
import * as String from 'app/shared/util/string.util';

@Component({
  selector: 'temp-event',
  template: `
    <nz-card class="temp-event card">
      <ng-template #body>
        <h4 class="title">{{ event.eventName }}</h4>
        <p class="time">{{ event.time | date:'HH:mm' }}</p>
        <p class="description">{{ event.description }}</p>
        <div class="tools">
          <div class="setting" (click)="editTempEvent()"><i class="anticon anticon-edit"></i></div>
        </div>
      </ng-template>
    </nz-card>
  `,
  styleUrls: ['temp-event.component.scss']
})

export class TempEventComponent implements OnInit {
  @Input() event: EventActivity;

  constructor() { }

  ngOnInit() { }

  editTempEvent() {
    EmitterService.get(String.EDIT_TEMP_EVENT).emit(this.event);

    let responded = false;
    EmitterService.get(String.EDIT_TEMP_EVENT_SUBMIT)
      .takeWhile(() => !responded)
      .subscribe((temp) => {
        if (temp == null) {
          responded = true;
          return;
        }
        this.event = temp;
      });
  }
}
