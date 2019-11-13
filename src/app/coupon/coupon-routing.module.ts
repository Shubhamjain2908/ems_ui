import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';

const routes: Routes = [
  {
    path: '',
    component: CouponListComponent
  },
  {
    path: 'add',
    component: AddCouponComponent,
  },
  {
    path: 'edit/:id',
    component: AddCouponComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }
