import { Injectable } from '@angular/core';
import { HttpEventType, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'app/../environments/environment';
import { Observable } from 'rxjs/Observable';

import { EmitterService } from 'app/services/event-emitter.service';
import { EventActivity } from 'app/models';


@Injectable()
export class ActivityService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public createEvent(tripId, dayTripId, event): Observable<EventActivity> {
    return this.http.post(`${this.baseUrl}/trip/${tripId}/day/${dayTripId}/event`,
      {
        event: event
      })
      .map((res) => { return new EventActivity(res) })
      .catch((err) => Observable.throw(err || 'Server error'));
  }

  public editEvent(event): Observable<EventActivity> {
    return this.http
      .post(`${this.baseUrl}/trip/${event.tripId}/day/${event.dayTripId}/event/${event.id}`, { event: event })
      .map((res: any) => new EventActivity(res.event))
      .catch(err => Observable.throw(err || 'Server Error'));
  }

  public deleteActivity(activity): Observable<boolean> {
    return this.http
      .delete(`${this.baseUrl}/trip/${activity.tripId}/day/${activity.dayTripId}/activity/${activity.id}`)
      .map(res => { return true })
      .catch(err => Observable.throw(err || 'Server Error'));
  }

  public reorderActivity(reorderParam, dayTripId, tripId): Observable<EventActivity> {
    return this.http
      .post(`${this.baseUrl}/trip/${tripId}/day/${dayTripId}/reorder`, { activity: reorderParam })
      .map(res => { return new EventActivity(res) })
      .catch(err => Observable.throw(err || 'Server Error'));
  }
}
