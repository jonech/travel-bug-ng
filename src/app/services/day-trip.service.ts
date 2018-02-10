import { Injectable } from '@angular/core';
import { HttpEventType, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import { EmitterService } from './event-emitter.service';
import { DayTrip } from '../models/day-trip.model';


@Injectable()
export class DayTripService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getDayTrips(tripId): Observable<DayTrip[]> {
    return this.http.get(`${this.baseUrl}/trip/${tripId}/day`)
            .map((res: any) => { return res.map(d => new DayTrip(d)) })
            .catch((err) => Observable.throw(err || 'Server error'));
  }

  public createDayTrip(tripId, dayTrip): Observable<DayTrip> {
    return this.http.post(`${this.baseUrl}/trip/${tripId}/day`,
            {
              dayTrip: dayTrip || { dayTripName: null }
            })
            .map((res) => { return res })
            .catch((err) => Observable.throw(err || 'Server error'));
  }

  public updateDayTrip(tripId, dayTrip): Observable<DayTrip> {
    return this.http.post(`${this.baseUrl}/trip/${tripId}/day/${dayTrip.id}`,
            {
              dayTrip: dayTrip
            })
            .map((res) => { return res })
            .catch((err) => Observable.throw(err || 'Server error'));
  }
}
