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
