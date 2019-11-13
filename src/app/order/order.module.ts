import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffect } from './effects/order.effects';
import { OrderService } from './order.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    StoreModule.forFeature('order', reducers),
    EffectsModule.forFeature([OrderEffect]),
    OrderRoutingModule
  ],
  declarations: [OrderListComponent, OrderDetailComponent],
  providers: [OrderService]
})
export class OrderModule { }
