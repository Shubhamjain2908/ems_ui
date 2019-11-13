import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from '../shared/directives/match-height.directive';

import { NotificationComponent } from './notification/notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EditorModule } from 'primeng/editor';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RetailersService } from 'app/services/retailers.service';
import { NotificationService } from 'app/services/notification.service';


@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ChartistModule,
    NgbModule,
    MatchHeightModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    EditorModule,
    ToggleButtonModule,
    MultiSelectModule
  ],
  exports: [],
  declarations: [
    NotificationComponent,
  ],
  providers: [NotificationService],
})
export class NotificationModule { }
