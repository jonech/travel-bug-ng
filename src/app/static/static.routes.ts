import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { PrivacyPolicyComponent } from './privacy_policy.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'about',
		component: AboutComponent,
	},
	{
		path: 'privacyandpolicy',
		component: PrivacyPolicyComponent,
	}
]
