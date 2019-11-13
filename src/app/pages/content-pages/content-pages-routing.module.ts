import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './error/error-page.component';
import { LoginPageComponent } from './login/login-page.component';
import { LogoutComponent } from './login/logout.component';
import { ForgotPageComponent } from './forgot/forgot-page.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error Page'
        }
      },
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'forgot',
        component: ForgotPageComponent,
        data: {
          title: 'forgot page'
        },
      },
      {
        path: 'logout',
        component: LogoutComponent,
        data: {
          title: 'logout page'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
