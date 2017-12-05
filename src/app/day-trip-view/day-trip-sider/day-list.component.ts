import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DayTrip } from '../../models';

@Component({
  selector: 'day-list',
  styleUrls: ['day-trip-sider.component.scss'],
  template: `
    <div class="left-side-bar">
      <nz-affix>
        <nz-anchor>
          <nz-link *ngFor="let day of dayList" nzHref="#{{ day.getDayTripNameTag() }}" nzTitle="{{ day.dayTripName }}"></nz-link>
        </nz-anchor>
      </nz-affix>
      <button nz-button [nzType]="'primary'" (click)="createDayTrip()">
        <span>Add Day Trip</span><i class="anticon anticon-plus"></i>
      </button>
    </div>
  `
})
export class DayListComponent implements OnInit, OnChanges {
  dayList: Array<DayTrip> = [];
  private _data = new BehaviorSubject<DayTrip[]>([]);

  @Input()
  set data(value) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
  }
  get data() {
    return this._data.getValue();
  }

  @Output() createDayTripClick:EventEmitter<any> = new EventEmitter();

  constructor(
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['dayList']) {
      this.dayList = changes['dayList'] as any;
    }
  }

  createDayTrip() {
    this.createDayTripClick.emit();
  }
}
