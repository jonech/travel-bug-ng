import { Routes } from '@angular/router';
import { DayTripViewComponent } from './daytripview.component';
import { ActivityListComponent } from './activity_list.component';
import { ActivityDetailComponent } from './activity_detail.component';

import { AuthGuard } from '../_guard/auth.guard';

export const routes: Routes = [
	{
		path: 'daytrip',
		canActivate: [ AuthGuard ],

		children: [
			{
				path: ':tripId/:dayTripId', component: DayTripViewComponent,

				children: [
					{ path: ':activityId', component: ActivityDetailComponent, outlet: 'pop-up' }
				]
			},
		]
	}
]
