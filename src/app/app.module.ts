
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
// import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';

import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';

import { CookieModule } from 'ngx-cookie';
import { BaseService } from './services/base.service';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { reducers } from './reducers';
import { AWSService } from './services/aws.service';
import { CategoryEffect } from './category/effects/category.effect';
import { CategoryService } from './category/category.service';
import { UnauthorizedInterceptor } from './utils/unauthorized.interceptor';
import { TagEffect } from './tag/effects/tag.effects';
import { TagService } from './tag/tag.service';


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // DragulaModule.forRoot(),
    HttpClientModule,
    // ToastrModule.forRoot(),
    NgbModule.forRoot(),
    CookieModule.forRoot(),
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CategoryEffect, TagEffect]),
    StoreDevtoolsModule.instrument({
      name: 'OneOps Admin Store'
    }),
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    BaseService,
    AWSService,
    CategoryService,
    TagService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
