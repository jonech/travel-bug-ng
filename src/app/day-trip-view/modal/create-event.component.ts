import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { EmitterService } from 'app/services/event-emitter.service';
import { EventActivity } from 'app/models';
import * as String from 'app/shared/util/string.util';

@Component({
  selector: 'create-event-modal',
  template: `
    <nz-modal [nzVisible]="isVisible"
      [nzTitle]="'Create Event'"
      [nzContent]="modalContent"
      [nzFooter]="null"
      (nzOnCancel)="handleCancel($event)">
      <ng-template #modalContent>
        <event-form (formSubmit)="handleSubmit($event)"></event-form>
      </ng-template>
      <ng-template #modalFooter>
      </ng-template>
    </nz-modal>
  `,
})

export class CreateEventComponent implements OnInit {

  isVisible: boolean = false;

  constructor() { }

  ngOnInit() {
    EmitterService.get(String.CREATE_EVENT).subscribe((modalOpen) => {
      if (modalOpen) {
        this.isVisible = true;
      }
      else {
        this.isVisible = false;
      }
    })
  }

  ngOnDestroy() {
    EmitterService.get(String.CREATE_EVENT).unsubscribe();
  }

  handleCancel(event) {
    this.isVisible = false;
  }

  handleSubmit(event: EventActivity) {
    console.log(typeof event, event);
  }
}
