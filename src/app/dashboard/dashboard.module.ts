import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { CreateTripComponent } from './create-trip/create-trip.component';
import { TripComponent } from './trip/trip.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripUsersComponent } from './trip-user/trip-users.component';
import { DashboardComponent } from './dashboard.component';

import { AuthGuard } from '../guards/auth.guard';
import { EmitterService } from '../services/event-emitter.service';
import { AuthService } from '../services/auth.service';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgZorroAntdModule.forRoot(),
    SharedModule,
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
    AuthService
  ],
})
export class DashboardModule {}
