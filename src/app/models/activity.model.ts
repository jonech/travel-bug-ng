export class Activity {
  public id: number;
  public dayTripId: number;
  public tripId: number;
  public createdBy: number;
  public type: string;
  public position?: number;
  public time?: string;
  public description?: string;
  public status?: string;

  public constructor(init?: Partial<Activity>) {
    Object.assign(this, init);
  }

  public setTimeDate(value: Date) {
    if (value == null) {
      return;
    }
    this.time = `${value.getHours()}:${value.getMinutes()}`;
  }
  public getTimeDate(): Date {
    if (this.time == null) {
      return null;
    }

    let date = new Date();
    date.setHours(Number(this.time.split(':')[0]))
    date.setMinutes(Number(this.time.split(':')[1]))
    return date;
  }
}

export class EventActivity extends Activity {
  public eventName?: string;
  constructor(init?: Partial<EventActivity>) {
    super(init);
  }
}

export class TransportActivity extends Activity {
  public transport?: string;
  constructor(init?: Partial<TransportActivity>) {
    super(init);
  }
}
