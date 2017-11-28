import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'create-trip-modal',
  template: `
    <nz-modal [nzVisible]="isVisible"
      [nzTitle]="'Create a trip!'"
      [nzContent]="modalContent"
      [nzFooter]="null"
      (nzOnCancel)="handleCancel($event)"

      [nzConfirmLoading]="isConfirmLoading">
      <ng-template #modalContent>
        <create-trip-form></create-trip-form>
      </ng-template>
      <ng-template #modalFooter>
      </ng-template>
    </nz-modal>
  `
})

export class CreateTripModalComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Output() createTripClose = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isVisible = changes.isVisible.currentValue
  }

  handleCancel() {
    this.isVisible = false;
    this.createTripClose.emit(false);
  }


}
