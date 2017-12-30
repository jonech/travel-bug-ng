import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EmitterService, ActivityService } from 'app/services';
import { Subject } from 'rxjs/Subject';

import { EventActivity } from 'app/models';
import { EventFormComponent } from './event-form.component';
import * as String from 'app/shared/util/string.util';

@Component({
  selector: 'edit-event-modal',
  template: `
    <nz-modal [nzVisible]="isVisible"
      [nzTitle]="'Edit Event'"
      [nzContent]="modalContent"
      [nzFooter]="null"
      (nzOnCancel)="handleCancel($event)">
      <ng-template #modalContent>
        <event-form [event]="event" (formSubmit)="handleSubmit($event)"></event-form>
      </ng-template>
      <ng-template #modalFooter>
      </ng-template>
    </nz-modal>
  `
})

export class EditEventComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  isVisible: boolean = false;
  event: EventActivity = new EventActivity();
  @ViewChild(EventFormComponent) eventForm: EventFormComponent;

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    // listen to edit event button click in event activity
    EmitterService.get(String.EDIT_EVENT)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: EventActivity) => {
        this.isVisible = true;
        this.event = event;
      });
  }

  handleCancel(event) {
    this.isVisible = false;
    EmitterService.get(String.EDIT_EVENT_SUBMIT).emit(null);
  }

  handleSubmit(updatedEvent: EventActivity) {
    let responded = false;
    this.event.eventName = updatedEvent.eventName;
    this.event.description = updatedEvent.description;
    this.event.time = updatedEvent.time;
    this.activityService.editEvent(this.event)
      .takeWhile(() => !responded)
      .subscribe(res => {
        console.log(res);
        EmitterService.get(String.EDIT_EVENT_SUBMIT).emit(res);
        this.isVisible = false;
        this.eventForm.resetForm();
        responded = true;
      }, err => {
        EmitterService.get(String.EDIT_EVENT_SUBMIT).emit(null);
        console.log(err);
        responded = true;
      });
  }

  ngOnDestroy() {
    //EmitterService.get(String.EDIT_EVENT).unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
