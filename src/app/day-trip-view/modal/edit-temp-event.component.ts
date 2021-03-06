import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { EmitterService } from 'app/services';
import { EventActivity } from 'app/models';
import { EventFormComponent } from './event-form.component';
import * as String from 'app/shared/util/string.util';

@Component({
  selector: 'edit-temp-event-modal',
  template: `
    <nz-modal [nzVisible]="isVisible"
      [nzTitle]="'Edit Temporary Event'"
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

export class EditTempEventComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  isVisible: boolean = false;
  event: EventActivity = new EventActivity();
  @ViewChild(EventFormComponent) eventForm: EventFormComponent;
  constructor() { }

  ngOnInit() {
    // listen to create event button click
    EmitterService.get(String.EDIT_TEMP_EVENT)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: EventActivity) => {
        this.isVisible = true;
        this.event = event;
      });
  }

  handleCancel(event) {
    this.isVisible = false;
    EmitterService.get(String.EDIT_TEMP_EVENT_SUBMIT).emit(null);
  }

  handleSubmit(event) {
    EmitterService.get(String.EDIT_TEMP_EVENT_SUBMIT).emit(event);
    this.isVisible = false;
    this.eventForm.resetForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
