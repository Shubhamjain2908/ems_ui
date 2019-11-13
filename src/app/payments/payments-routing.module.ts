import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { PaymentsDetailComponent } from './payments-detail/payments-detail.component';


const routes: Routes = [
  {
    path: '',
    component: PaymentsListComponent
  },
  {
    path: 'detail/:paymentsId',
    component: PaymentsDetailComponent
  },
  {
    path: ':supplierId',
    component: PaymentsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
