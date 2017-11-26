import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { EmitterService } from '../services/event-emitter.service';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    EmitterService,
    AuthService
  ],
})
export class AuthModule { }
