import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'app/models/user.model';
import { FbUser } from 'app/models/fb-user.model';
import { ProfileDefaultBase64, EmailRegEx } from '../../shared/util/string.util';
import{ AuthService } from 'app/services/auth.service';

@Component({
	selector: 'register',
  styleUrls: ['register.component.scss'],
  template: `
    <div id="form-wrapper">

      <img style="padding-bottom:20px;" src="assets/img/logo.png"/>

      <div class="title">Join Travel Bug</div>
      <p>Already have an account with us?</p>
      <button nz-button [nzType]="'primary'"  class="login" (click)="ToLogin()">
        <span>LOGIN</span>
      </button>

      <div class="or-divider"><span>OR</span></div>

      <div *ngIf="error">
        <span style="color: red; font-size: 10px;">
          <p>{{ error }}</p>
        </span>
      </div>

      <form nz-form [nzLayout]="'vertical'" [formGroup]="registerForm">
        <div nz-form-item nz-row>
          <div nz-form-label nz-col>
            <label for="email" nz-form-item-required>E-mail</label>
          </div>
          <div nz-form-control nz-col nzHasFeedback [nzValidateStatus]="getFormControl('email')">
            <nz-input [nzSize]="'large'" formControlName="email" [nzId]="'email'"></nz-input>
            <div nz-form-explain *ngIf="getFormControl('email').dirty&&getFormControl('email').hasError('email')">The input is not valid E-mail!</div>
          </div>
        </div>
        <div nz-form-item nz-row>
          <div nz-form-label nz-col>
            <label for="password" nz-form-item-required>Password</label>
          </div>
          <div nz-form-control nz-col nzHasFeedback [nzValidateStatus]="getFormControl('password')">
            <nz-input [nzSize]="'large'" formControlName="password" [nzType]="'password'" [nzId]="'password'" (ngModelChange)="updateConfirmValidator()"></nz-input>
            <div nz-form-explain *ngIf="getFormControl('password').dirty&&getFormControl('password').hasError('required')">
              Please input your password!
            </div>
          </div>
        </div>
        <div nz-form-item nz-row>
          <div nz-form-label nz-col>
            <label for="passwordConfirmation" nz-form-item-required>Confirm Password</label>
          </div>
          <div nz-form-control nz-col nzHasFeedback [nzValidateStatus]="getFormControl('passwordConfirmation')">
            <nz-input [nzSize]="'large'" formControlName="passwordConfirmation" [nzType]="'password'" [nzId]="'passwordConfirmation'"></nz-input>
            <div nz-form-explain *ngIf="getFormControl('passwordConfirmation').dirty&&getFormControl('passwordConfirmation').hasError('required')">
              Please confirm your password!
            </div>
            <div nz-form-explain *ngIf="getFormControl('passwordConfirmation').dirty&&getFormControl('passwordConfirmation').hasError('confirm')">
              Two passwords that you enter is inconsistent!
            </div>
          </div>
        </div>

         <!-- Firstname -->
        <div nz-form-item nz-row>
          <div nz-form-label nz-col>
            <label for="firstname" nz-form-item-required>Firstname</label>
          </div>
          <div nz-form-control nz-col nzHasFeedback [nzValidateStatus]="getFormControl('firstName')">
            <nz-input formControlName="firstName" [nzSize]="'large'" [nzId]="'firstname'">
            </nz-input>
            <div nz-form-explain *ngIf="getFormControl('firstName').dirty&&getFormControl('firstName').hasError('required')">
              Firstname required
            </div>
          </div>
        </div>

        <!-- LastName -->
        <div nz-form-item nz-row>
          <div nz-form-label nz-col>
            <label for="lastname" nz-form-item nz-form-item-required>Lastname</label>
          </div>
          <div nz-form-control nz-col nzHasFeedback [nzValidateStatus]="getFormControl('lastName')">
            <nz-input formControlName="lastName" [nzSize]="'large'" [nzId]="'lastname'">
            </nz-input>
            <div nz-form-explain *ngIf="getFormControl('lastName').dirty&&getFormControl('lastName').hasError('required')">
              Lastname required
            </div>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-control nz-col>
            <button nz-button [nzLoading]="isLoading" [nzSize]="'large'" [nzType]="'primary'" (click)="submitForm()">Register</button>
          </div>
        </div>
      </form>
    </div>
  `,
})

export class RegisterComponent implements OnInit
{
	public registerForm: FormGroup;
	error: string;
  isLoading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authService: AuthService
	) {}

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    }
    else if (control.value !== this.registerForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  };

  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.registerForm.controls[ 'passwordConfirmation' ].updateValueAndValidity();
    });
  }

  getFormControl(name) {
    return this.registerForm.controls[ name ];
  }

	ngOnInit()
	{
		this.registerForm = this.fb.group({
      email: [ null, [ Validators.email ] ],
      password: [ null, [ Validators.required ] ],
      passwordConfirmation: [ null, [ Validators.required, this.confirmationValidator ] ],
      firstName: [ null, [ Validators.required ] ],
      lastName: [ null, [ Validators.required ]]
    });
	}

  submitForm() {
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[ i ].markAsDirty();
    }
    if (this.registerForm.valid) {
      this.registerWithEmail();
      this.isLoading = true;
    }
  }

	registerWithEmail() {
    let u = new User(this.registerForm.value);
    let responded = false;
    this.authService.registerWithEmail(u)
      .takeWhile(() => !responded)
      .subscribe(res => {
        this.isLoading = false;
        responded = true;
        this.ToLogin();
      },
      err => {
        this.isLoading = false;
        responded = true;
        // TODO: fix
        this.error = err.error.error.join(", ");
      });
	}

  //TODO: change default photo
	LoginWithFacebook() {
		this.authService.LoginWithFacebook();
	}

	ToLogin() {
		this.router.navigate(['/login', {redirect: 'register'}]);
	}
}
