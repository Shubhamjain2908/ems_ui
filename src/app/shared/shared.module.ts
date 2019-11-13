import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToggleFullscreenDirective } from './directives/toggle-fullscreen.directive';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { JoinComma, SafePipe, ReplacePipe } from 'app/utils/pipes';


@NgModule({
  exports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ToggleFullscreenDirective,
    NgbModule,
    EmptyStateComponent,
    JoinComma,
    SafePipe,
    ReplacePipe
    // TranslateModule
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    // TranslateModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ToggleFullscreenDirective,
    EmptyStateComponent,
    JoinComma,
    SafePipe,
    ReplacePipe
  ]
})
export class SharedModule { }
