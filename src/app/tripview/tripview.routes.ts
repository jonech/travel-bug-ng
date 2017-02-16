import { Routes } from '@angular/router';
import { TripViewComponent } from './tripview.component';
import { DayTripListComponent } from './daytriplist.component';

import { AuthGuard } from '../_guard/auth.guard';

export const routes: Routes = [
	{
		path: 'trip',
		canActivate: [ AuthGuard ],
		component: TripViewComponent,

		children: [
			{ path: ':id', component: DayTripListComponent },
		]
	}
]
