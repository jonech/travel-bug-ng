import { Activity, EventActivity, TransportActivity  } from '.';

export class DayTrip {
  public id: number;
  public tripId: number;
  public dayTripName?: string;
  public date?: string;
  public activities?: Activity[];

  public constructor(init?: Partial<DayTrip>) {
    Object.assign(this, init);
    this.activities = this.activities.map(activity => {
      if (activity.type === 'EventActivity') {
        return new EventActivity(activity);
      }
      else if (activity.type === 'TransportActivity') {
        return new TransportActivity(activity);
      }
      else {
        return new Activity(activity);
      }
    });
  }

  public getDayTripNameTag(): String {
    return this.dayTripName.toLowerCase().split(' ').join('-')
  }
}
