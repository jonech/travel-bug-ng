import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { AuthService } from '../services/auth.service';
import { EmitterService } from '../services/event-emitter.service';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule.forRoot(),
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    AuthService,
    EmitterService,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
})
export class CoreModule { }
