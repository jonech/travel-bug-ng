import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';


import { TripFormComponent } from './trip-modal/trip-form.component';
import { CreateTripModalComponent } from './trip-modal/create-trip-modal.component';
import { EditTripModalComponent } from './trip-modal/edit-trip-modal.component';
import { TripComponent } from './trip/trip.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripUsersComponent } from './trip-user/trip-users.component';
import { DashboardComponent } from './dashboard.component';

import { AuthGuard } from '../guards/auth.guard';
import {
  AuthInterceptor,
  TripService,
  EmitterService
} from '../services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgZorroAntdModule.forRoot(),
    SharedModule,
    HttpClientModule,
  ],
  declarations: [
    TripFormComponent,
    CreateTripModalComponent,
    EditTripModalComponent,
    TripComponent,
    TripListComponent,
    TripUsersComponent,
    DashboardComponent
  ],
  providers: [
    AuthGuard,
    EmitterService,
    TripService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})
export class DashboardModule {}
