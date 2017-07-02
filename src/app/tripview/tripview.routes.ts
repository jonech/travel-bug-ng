import { Routes } from '@angular/router';
import { TripViewComponent } from './tripview.component';
import { DayTripListComponent } from './daytriplist.component';

import { InviteByemailComponent } from './invite-members-component/invite-byemail/invite-byemail.component';
import { InviteFbComponent } from './invite-members-component/invite-fb/invite-fb.component';

import { AuthGuard } from '../_guard/auth.guard';

export const routes: Routes = [
	{
		path: 'trip',
		canActivate: [ AuthGuard ],
		component: TripViewComponent,

		children: [
			{ 
				path: ':id', 
				component: DayTripListComponent,
				
				children: [
					{path: 'invite_by_email', component: InviteByemailComponent},
					{path: 'invite_by_fb', component: InviteFbComponent},

				]
			},
			

		]
	}
]
