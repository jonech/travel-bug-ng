import { Routes } from '@angular/router';
// import { DayTripViewComponent } from './daytripview.component';
// import { ActivityListComponent } from './activity_list.component';
// import { ActivityDetailComponent } from '../activitydetail/activity_detail.component';

import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
	// {
	// 	path: 'daytrip',
	// 	canActivate: [ AuthGuard ],

	// 	children: [
	// 		{
	// 			path: ':tripId/:dayTripId', component: DayTripViewComponent,

	// 			children: [
	// 				{ path: ':activityId', component: ActivityDetailComponent, outlet: 'pop-up' }
	// 			]
	// 		},
	// 	]
	// }
]
