import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from './content-pages-routing.module';

import { ErrorPageComponent } from './error/error-page.component';
import { LoginPageComponent } from './login/login-page.component';
import { LogoutComponent } from './login/logout.component';
import { CustomFormsModule } from 'ng5-validation';
import { ForgotPageComponent } from './forgot/forgot-page.component';


@NgModule({
  imports: [
    CommonModule,
    ContentPagesRoutingModule,
    FormsModule, ReactiveFormsModule, CustomFormsModule
  ],
  declarations: [
    ErrorPageComponent,
    LoginPageComponent,
    LogoutComponent,
    ForgotPageComponent
  ]
})
export class ContentPagesModule { }
