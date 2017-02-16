import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routing } from './app.routes';

import { AuthGuard } from './_guard/auth.guard';

import { GoogleService } from './_service/google.service';

import { StringToDatePipe } from './_pipe/string-to-date.pipe';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';

import { AgmCoreModule } from "angular2-google-maps/core"

import { AppComponent } from './app.component';

import { HomeComponent } from './static/home.component';
import { AboutComponent } from './static/about.component';

import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TripListComponent } from './dashboard/trip_list.component';
import { PastTripComponent } from './dashboard/past_trip.component';
import { TripComponent } from './dashboard/trip.component';
import { GoingUserComponent } from './dashboard/goingUser.component';

import { TripViewComponent } from './tripview/tripview.component';
import { DayTripListComponent } from './tripview/daytriplist.component';
import { DayTripComponent } from './tripview/daytrip.component';
import { DayTripImageComponent } from './tripview/daytripImage.component';

import { DayTripViewComponent } from './daytripview/daytripview.component';
import { ActivityListComponent } from './daytripview/activity_list.component';

@NgModule({
  declarations: [
	StringToDatePipe,

    AppComponent,

	HomeComponent,
	AboutComponent,

	RegisterComponent,
	LoginComponent,

	DashboardComponent,
	TripListComponent,
	PastTripComponent,
	TripComponent,
	GoingUserComponent,

	TripViewComponent,
	DayTripListComponent,
	DayTripComponent,
	DayTripImageComponent,

	DayTripViewComponent,
	ActivityListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
	ReactiveFormsModule,
    HttpModule,
	Routing,

	AgmCoreModule.forRoot({
		apiKey: "AIzaSyDYofVbNPz44rYZJanHhMKjnaXoMRZ8--c",
		libraries:["places"]
	}),

	AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
	  AuthGuard,
	  GoogleService,
	],
  bootstrap: [AppComponent]
})

export class AppModule { }
