import { Routes } from '@angular/router';
import { DayTripViewComponent } from './daytripview.component';
import { ActivityListComponent } from './activity_list.component';

import { AuthGuard } from '../_guard/auth.guard';

export const routes: Routes = [
	{
		path: 'daytrip',
		canActivate: [ AuthGuard ],

		children: [
			{ path: ':id', component: DayTripViewComponent },
		]
	}
]
