import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng5-validation';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './login/logout.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ]
})
export class AuthModule { }
