import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { PrivacyPolicyComponent } from './privacy_policy.component';
import { TeamComponent } from './team.component';
import { TermsConditionComponent } from './terms_cond.component';

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
	},
    {
        path: 'tnc',
        component: TermsConditionComponent,
    },
	{
		path: 'team',
		component: TeamComponent,
	}
]
