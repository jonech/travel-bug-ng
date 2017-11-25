import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AgmCoreModule } from '@agm/core';
import { DragulaModule } from 'ng2-dragula';
import { FacebookModule } from 'ngx-facebook';

import { firebaseConfig } from '../environments/firebase.config';
import { googleConfig } from '../environments/google.config';

import { Routing } from './app.routes';

import { AuthGuard } from './_guard/auth.guard';

import { GoogleService } from './_service/google.service';
import { AuthService } from './_service/auth.service';
import { InviteService } from './tripview/invite-members-component/invite.service';

import { StringToDatePipe } from './_pipe/string-to-date.pipe';
import { AvatarLetters } from './_pipe/avatar-letters.pipe';

import { AuthEffect } from './effect/auth.effects';
import { reducers } from './reducer';


import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';

import { RegisterComponent } from './core/auth/register/register.component';
import { LoginComponent } from './core/auth/login/login.component';

import { HomeComponent } from './core/static/home/home.component';
import { AboutComponent } from './core/static/about/about.component';
import { PrivacyPolicyComponent } from './core/static/privacy-policy/privacy-policy.component';
import { TeamComponent } from './core/static/team.component';
import { TermsConditionComponent } from './core/static/terms-n-conditions/terms-n-conditions.component';

import { FirebasePlaceImageComponent } from './reuseable/firebase_place_image.component';
import { SmallRoundImageComponent } from './reuseable/small_round_image.component';
import { GooglePlaceImageComponent } from './reuseable/google_place_image.component';
import { ClickEditTextComponent } from './reuseable/click_edit_text.component';
import { ClickEditLongTextComponent } from './reuseable/click_edit_long_text.component';
import { ClickEditPlaceComponent } from './reuseable/click_edit_place.component';
import { ClickEditTimeComponent } from './reuseable/click_edit_time.component';

import { DashboardComponent } from './core/dashboard/dashboard.component';
import { TripListComponent } from './core/dashboard/trip-list/trip-list.component';
import { PastTripComponent } from './core/dashboard/past-trip/past-trip.component';
import { TripComponent } from './core/dashboard/trip/trip.component';
import { GoingUserComponent } from './core/dashboard/goingUser.component';
import { HostComponent } from './core/dashboard/host.component';
import { CreateTripComponent } from './core/dashboard/create-trip/create-trip.component';
import { TripUsersComponent } from './core/dashboard/trip-user/trip-users.component';

import { TripViewComponent } from './tripview/tripview.component';
import { DayTripListComponent } from './tripview/daytriplist.component';
import { DayTripComponent } from './tripview/daytrip.component';
import { DayTripImageComponent } from './tripview/daytripImage.component';

import { DayTripViewComponent } from './daytripview/daytripview.component';
import { ActivityListComponent } from './daytripview/activity_list.component';
import { LocationFormComponent } from './daytripview/location_form.component';
import { LocationRowComponent } from './daytripview/location_row.component';
import { TransportFormComponent } from './daytripview/transport_form.component';
import { TransportRowComponent } from './daytripview/transport_row.component';
import { ActivityDetailComponent } from './activitydetail/activity_detail.component';
import { CommentComponent } from './activitydetail/comment.component';
import { CreateCommentComponent } from './activitydetail/create_comment.component';

import { InviteMembersComponentComponent } from './tripview/invite-members-component/invite-members-component.component';
import { FriendListComponent } from './tripview/invite-members-component/friend-list/friend-list.component';
import { FriendItemComponent } from './tripview/invite-members-component/friend-list/friend-item.component';
import { ChosenFriendComponent } from './tripview/invite-members-component/chosen-friend/chosen-friend.component';


@NgModule({
  declarations: [
    // pipes
    StringToDatePipe,
    AvatarLetters,

    AppComponent,
    HeaderComponent,
    FooterComponent,

    // static
    HomeComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    TeamComponent,
    TermsConditionComponent,

    // auth
    RegisterComponent,
    LoginComponent,

    // reuse
    FirebasePlaceImageComponent,
    SmallRoundImageComponent,
    GooglePlaceImageComponent,
    ClickEditTextComponent,
    ClickEditLongTextComponent,
    ClickEditPlaceComponent,
    ClickEditTimeComponent,

    // Dashboard
    DashboardComponent,
    TripListComponent,
    PastTripComponent,
    TripComponent,
    GoingUserComponent,
    HostComponent,
    CreateTripComponent,
    TripUsersComponent,

    // tripview or fullview
    TripViewComponent,
    DayTripListComponent,
    DayTripComponent,
    DayTripImageComponent,

    // daytripview
    DayTripViewComponent,
    ActivityListComponent,
    LocationFormComponent,
    LocationRowComponent,
    TransportFormComponent,
    TransportRowComponent,


    // activity detail
    ActivityDetailComponent,
    CommentComponent,
    CreateCommentComponent,

    InviteMembersComponentComponent,
    FriendListComponent,
    FriendItemComponent,
    ChosenFriendComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
	  ReactiveFormsModule,
    HttpClientModule,
	  Routing,
    BrowserAnimationsModule,

    //StoreModule.(reducers),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffect]),
    NgZorroAntdModule.forRoot(),

	  AgmCoreModule.forRoot(googleConfig),

	  AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    FacebookModule.forRoot(),
    DragulaModule,
  ],
  providers: [
	  // guards
	  AuthGuard,

	  // services
	  GoogleService,

	  //services
	  AuthService,

	  //services
	  InviteService
	],
  bootstrap: [AppComponent]
})

export class AppModule { }
