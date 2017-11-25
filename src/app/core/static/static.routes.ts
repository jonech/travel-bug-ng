import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TeamComponent } from './team.component';
import { TermsConditionComponent } from './terms-n-conditions/terms-n-conditions.component';

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
