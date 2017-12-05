import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { DayTripViewComponent } from './day-trip-view.component';

import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
	{
		path: 'daytrip',
		canActivate: [ AuthGuard ],

		children: [
			// {
			// 	path: ':tripId/:dayTripId', component: DayTripViewComponent,
			// 	// children: [
			// 	// 	{ path: ':activityId', component: ActivityDetailComponent, outlet: 'pop-up' }
			// 	// ]
      // },
      { path: ':tripId', component: DayTripViewComponent },
      { path: '', redirectTo: 'trips', pathMatch: 'full' },
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
export class DayTripViewRoutingModule {}
