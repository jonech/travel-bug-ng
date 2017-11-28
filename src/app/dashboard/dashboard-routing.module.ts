import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { TripComponent } from './trip/trip.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripUsersComponent } from './trip-user/trip-users.component';
import { DashboardComponent } from './dashboard.component';

import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard],

		children: [
			{ path: 'trips', component: TripListComponent },
			{ path: '', redirectTo: 'trips', pathMatch: 'full'},
		]
	}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {}
