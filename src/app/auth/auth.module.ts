import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './login/login.component';
import { AuthReducer } from './auth.reducer'
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', AuthReducer)
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule { }
