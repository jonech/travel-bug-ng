import { Routes } from '@angular/router';
import { DetailViewComponent } from './detail_view.component';

import { AuthGuard } from '../_guard/auth.guard';

export const routes: Routes = [
	{
		path: 'activity',
		canActivate: [ AuthGuard ],

		children: [
			{ path: ':id', component: DetailViewComponent, outlet: 'pop-up' },
		]
	}
]
