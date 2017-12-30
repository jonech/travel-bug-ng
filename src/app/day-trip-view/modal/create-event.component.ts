import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { EmitterService, ActivityService } from 'app/services';
import { EventActivity } from 'app/models';
import * as String from 'app/shared/util/string.util';
import { EventFormComponent } from './event-form.component';
import { Subject } from 'rxjs/Subject';

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

export class CreateEventComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  isVisible: boolean = false;
  @ViewChild(EventFormComponent) eventForm: EventFormComponent;

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    // listen to create event button click
    EmitterService.get(String.CREATE_TEMP_EVENT)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((modalOpen) => {
        if (modalOpen) {
          this.isVisible = true;
        }
        else {
          this.isVisible = false;
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  handleCancel(event) {
    this.isVisible = false;
  }

  handleSubmit(event: EventActivity) {
    console.log(typeof event, event);
    EmitterService.get(String.CREATE_TEMP_EVENT_SUBMIT).emit(event);
    this.eventForm.resetForm();
    this.isVisible = false;
  }

  createEvent(event: EventActivity) {
    //this.activityService.createEvent()
  }
}
