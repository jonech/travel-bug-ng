import { Injectable } from '@angular/core';
import { HttpEventType, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { Trip } from '../models/trip.model';
import { Observable } from 'rxjs/Observable';


interface TripResponse {
  errors?: any
}

@Injectable()
export class TripService {

  private tripUrl = `${environment.apiUrl}/trip`;
  private create

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getTrips(): Observable<Trip[]> {
    return this.http.get(this.tripUrl)
            .map((res: any) => {
              // return res.map(trip => {
              //   return new Trip(trip);
              // });
              return res;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'))
  }
}
