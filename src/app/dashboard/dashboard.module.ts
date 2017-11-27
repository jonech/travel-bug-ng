import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';


import { CreateTripComponent } from './create-trip/create-trip.component';
import { TripComponent } from './trip/trip.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripUsersComponent } from './trip-user/trip-users.component';
import { DashboardComponent } from './dashboard.component';

import { AuthGuard } from '../guards/auth.guard';
import {
  AuthInterceptor,
  TripService,
  AuthService,
  EmitterService
} from '../services';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgZorroAntdModule.forRoot(),
    SharedModule,
    HttpClientModule,
  ],
  declarations: [
    CreateTripComponent,
    TripComponent,
    TripListComponent,
    TripUsersComponent,
    DashboardComponent
  ],
  providers: [
    AuthGuard,
    EmitterService,
    AuthService,
    TripService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
})
export class DashboardModule {}
