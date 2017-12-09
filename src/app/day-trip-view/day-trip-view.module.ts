import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from '../shared/shared.module';
import { DayTripViewRoutingModule } from './day-trip-view-routing.module';

import { AuthGuard } from '../guards/auth.guard';
import {
  AuthInterceptor,
  EmitterService,
  DayTripService,
} from '../services';

import { DayTripViewComponent } from './day-trip-view.component';
import { DayListComponent } from './day-trip-sider/day-list.component';
import { EventComponent } from './activity/event.component';
import { TransportComponent } from './activity/transport.component';
import { CreateEventComponent } from './modal/create-event.component';
import { CreateTransportComponent } from './modal/create-transport.component';
import { EventFormComponent } from './modal/event-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DayTripViewRoutingModule,
    NgZorroAntdModule.forRoot(),
    SharedModule,
    HttpClientModule,
  ],
  declarations: [
    DayTripViewComponent,
    DayListComponent,
    EventComponent,
    TransportComponent,
    CreateEventComponent,
    CreateTransportComponent,
    EventFormComponent
  ],
  providers: [
    AuthGuard,
    EmitterService,
    DayTripService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})

export class DayTripViewModule { }
