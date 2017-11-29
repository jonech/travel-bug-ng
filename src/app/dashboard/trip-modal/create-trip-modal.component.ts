import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { TripFormComponent } from './trip-form.component';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models';

@Component({
  selector: 'create-trip-modal',
  template: `
    <nz-modal [nzVisible]="isVisible"
      [nzTitle]="'Create a trip!'"
      [nzContent]="modalContent"
      [nzFooter]="null"
      (nzOnCancel)="handleCancel($event)">
      <ng-template #modalContent>
        <trip-form (formSubmit)="handleSubmit($event)"></trip-form>
      </ng-template>
      <ng-template #modalFooter>
      </ng-template>
    </nz-modal>
  `
})
export class CreateTripModalComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Output() createTripClose = new EventEmitter();
  @ViewChild(TripFormComponent) tripForm: TripFormComponent;

  constructor(private tripService: TripService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isVisible = changes.isVisible.currentValue
  }

  handleCancel() {
    this.closeModal();
  }

  handleSubmit(form) {
    this.createTrip(form);
  }

  private createTrip(trip: Trip) {
    this.tripService.createTrip(trip).subscribe(
      res => {
        this.tripForm.resetForm();
        this.closeModal();
      },
      (error) => {
        console.log(error);
        this.tripForm.resetForm();
        this.closeModal();
      }
    );
  }

  private closeModal() {
    this.isVisible = false;
    this.createTripClose.emit();
  }
}
