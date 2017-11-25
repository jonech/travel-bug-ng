import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PastTripComponent } from './past-trip/past-trip.component';
import { TripListComponent } from './trip-list/trip-list.component';


import { AuthGuard } from '../../_guard/auth.guard';

export const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard],

		children: [
			{ path: 'past-trip', component: PastTripComponent },
			{ path: 'trips', component: TripListComponent },
			{ path: '', redirectTo: 'trips', pathMatch: 'full'},

		]
	}
]


