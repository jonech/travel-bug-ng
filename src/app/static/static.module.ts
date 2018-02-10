import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { StaticRoutingModule } from './static-routing.module';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TeamComponent } from './team/team.component';
import { TermsConditionComponent } from './terms-n-conditions/terms-n-conditions.component';
import { TestComponent } from './playground/test.component';

@NgModule({
  imports: [
    CommonModule,
    StaticRoutingModule,
    NgZorroAntdModule.forRoot(),
  ],
  exports: [],
  declarations: [
    HomeComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    TeamComponent,
    TermsConditionComponent,
    TestComponent
  ]
})
export class StaticModule { }
