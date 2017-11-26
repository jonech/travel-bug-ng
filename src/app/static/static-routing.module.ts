import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TeamComponent } from './team/team.component';
import { TermsConditionComponent } from './terms-n-conditions/terms-n-conditions.component';

const routes: Routes = [
  {
		path: '',
		component: HomeComponent,
	},
	{
		path: 'about',
		component: AboutComponent,
	},
	{
		path: 'privacy-policy',
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
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class StaticRoutingModule { }
