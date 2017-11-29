import { Injectable } from '@angular/core';
import { HttpEventType, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { Trip } from '../models/trip.model';
import { Observable } from 'rxjs/Observable';
import { EmitterService } from './event-emitter.service';

interface TripResponse {
  errors?: any
}

@Injectable()
export class TripService {

  private tripUrl = `${environment.apiUrl}/trip`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getTrips(): Observable<Trip[]> {
    return this.http.get(this.tripUrl)
            .map((res: any) => {
              return res;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'))
  }

  public createTrip(trip: Trip): Observable<Trip> {
    return this.http.post(this.tripUrl, { trip: trip})
            .map((res: Trip) => {
              EmitterService.get('[Trip] Refresh').emit(res);
              return res;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'))
  }

  public deleteTrip(tripId: number): Observable<string> {
    return this.http.delete(`${this.tripUrl}/${tripId}`)
            .map((res: any) => {
              EmitterService.get('[Trip] Refresh').emit(res);
              return res;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public updateTrip(trip: Trip): Observable<Trip> {
    return this.http.post(`${this.tripUrl}/${trip.id}`,
      {
        trip: {
          tripName: trip.tripName,
          startDate: trip.startDate,
          endDate: trip.endDate
        }
      })
      .map((res: Trip) => {
        EmitterService.get('[Trip] Refresh').emit(res);
        return res;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'))
  }
}
