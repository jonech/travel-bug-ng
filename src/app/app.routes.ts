import { Routes, RouterModule } from '@angular/router';
import { routes as StaticRoutes } from './core/static/static.routes';
import { routes as AuthRoutes } from './core/auth/auth.routes';
import { routes as DashboardRoutes } from './core/dashboard/dashboard.routes';
import { routes as TripViewRoutes } from './tripview/tripview.routes';
import { routes as DayTripViewRoutes } from './daytripview/daytripview.routes';

const routes: Routes = [
	...StaticRoutes,
	...AuthRoutes,
	...DashboardRoutes,
	...TripViewRoutes,
	...DayTripViewRoutes
];

export const Routing = RouterModule.forRoot(routes);
