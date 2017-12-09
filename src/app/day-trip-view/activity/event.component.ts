import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { EventActivity } from '../../models';

@Component({
  selector: 'event',
  styleUrls: ['event.component.scss'],
  template: `
    <div nz-col [nzSpan]="24" class="card-wrapper">
      <nz-card class="card">
        <ng-template #body>
          <div nz-row [nzType]="'flex'" [nzAlign]="'middle'">
            <div nz-col [nzSpan]="3"><div class="time">09:00</div></div>
            <div nz-col [nzSpan]="5">
              <div class="location-img"></div>
            </div>
            <div nz-col [nzSpan]="16">
              <h4 class="event-name">Event Name</h4>
              <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
            </div>
          </div>
          <div class="tools">
            <div class="setting"><i class="anticon anticon-edit"></i></div>
          </div>
        </ng-template>
      </nz-card>
    </div>
  `
})

export class EventComponent implements OnInit {

  @Input() event: EventActivity;

  constructor() { }

  ngOnInit() { }
}
