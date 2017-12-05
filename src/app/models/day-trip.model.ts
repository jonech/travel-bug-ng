import { Activity } from '.';

export class DayTrip {
  public id: number;
  public tripId: number;
  public dayTripName?: string;
  public date?: string;
  public activities?: Activity[];

  public constructor(init?: Partial<DayTrip>) {
    Object.assign(this, init);
  }

  public getDayTripNameTag(): String {
    return this.dayTripName.toLowerCase().split(' ').join('-')
  }
}
