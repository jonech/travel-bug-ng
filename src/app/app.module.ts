import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Routing } from './app.routes';

import { AuthGuard } from './guards/auth.guard';

import { GoogleService } from './services/google.service';
import {
  AuthService,
  EmitterService
} from './services';

import { StringToDatePipe } from './shared/pipes/string-to-date.pipe';
import { AvatarLetters } from './shared/pipes/avatar-letters.pipe';

import { firebaseConfig } from '../environments/firebase.config';
import { googleConfig } from '../environments/google.config';


import { AgmCoreModule } from '@agm/core';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { StaticModule } from './static/static.module';

import { FacebookModule } from 'ngx-facebook';

import { FirebasePlaceImageComponent } from './reuseable/firebase_place_image.component';
import { SmallRoundImageComponent } from './reuseable/small_round_image.component';
import { GooglePlaceImageComponent } from './reuseable/google_place_image.component';
import { ClickEditTextComponent } from './reuseable/click_edit_text.component';
import { ClickEditLongTextComponent } from './reuseable/click_edit_long_text.component';
import { ClickEditPlaceComponent } from './reuseable/click_edit_place.component';
import { ClickEditTimeComponent } from './reuseable/click_edit_time.component';

import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DayTripViewModule } from './day-trip-view/day-trip-view.module';

import { TripViewComponent } from './tripview/tripview.component';
import { DayTripListComponent } from './tripview/daytriplist.component';
import { DayTripComponent } from './tripview/daytrip.component';
import { DayTripImageComponent } from './tripview/daytripImage.component';


import { InviteMembersComponentComponent } from './tripview/invite-members-component/invite-members-component.component';
import { InviteService } from './tripview/invite-members-component/invite.service';

import { FriendListComponent } from './tripview/invite-members-component/friend-list/friend-list.component';
import { FriendItemComponent } from './tripview/invite-members-component/friend-list/friend-item.component';
import { ChosenFriendComponent } from './tripview/invite-members-component/chosen-friend/chosen-friend.component';


@NgModule({
  declarations: [
    // pipes
    // StringToDatePipe,
    // AvatarLetters,

    AppComponent,

    // reuse
    FirebasePlaceImageComponent,
    SmallRoundImageComponent,
    GooglePlaceImageComponent,
    ClickEditTextComponent,
    ClickEditLongTextComponent,
    ClickEditPlaceComponent,
    ClickEditTimeComponent,

    // tripview or fullview
    TripViewComponent,
    DayTripListComponent,
    DayTripComponent,
    DayTripImageComponent,

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

    AuthModule,
    StaticModule,
    CoreModule,
    DashboardModule,
    DayTripViewModule,

    NgZorroAntdModule.forRoot(),

	  AgmCoreModule.forRoot(googleConfig),

	  //AngularFireModule.initializeApp(firebaseConfig),
    //AngularFireDatabaseModule,
    //AngularFireAuthModule,

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
    EmitterService,

	  //services
    InviteService
	],
  bootstrap: [AppComponent]
})

export class AppModule { }
