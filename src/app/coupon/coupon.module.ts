import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponRoutingModule } from './coupon-routing.module';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from 'app/product/effects/product.effect';
import { CollectionEffect } from 'app/collection/effects/collection.effect';
import { CouponEffect } from './effects/coupon.effect';
import { ProductService } from 'app/product/product.service';
import { CollectionService } from 'app/collection/collection.service';
import { CouponService } from './coupon.service';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { NgxTreeSelectModule } from 'ngx-tree-select';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AutoCompleteModule,
    RadioButtonModule,
    DropdownModule,
    CalendarModule,
    NgxTreeSelectModule.forRoot({
      allowFilter: true,
      filterPlaceholder: 'Category name',
      maxVisibleItemCount: 5,
      idField: 'id',
      textField: 'name',
      childrenField: 'children',
      allowParentSelection: true,
      expandMode: 'Selection'
    }),
    StoreModule.forFeature('coupon', reducers),
    EffectsModule.forFeature([ProductEffect, CollectionEffect, CouponEffect]),
    CouponRoutingModule
  ],
  declarations: [CouponListComponent, AddCouponComponent],
  providers: [ProductService, CollectionService, CouponService]
})
export class CouponModule { }
