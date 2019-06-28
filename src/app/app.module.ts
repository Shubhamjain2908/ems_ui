
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService, CookieModule } from 'ngx-cookie';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { BaseService } from './services/base.service';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    CookieService,
    BaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
