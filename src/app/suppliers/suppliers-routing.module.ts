import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierListingComponent } from './supplier-listing/supplier-listing.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { TodaysSuppliersComponent } from './todays-suppliers/todays-suppliers.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SupplierListingComponent,
        data: {
          title: 'Supplier listing'
        }
      },
      {
        path: 'add-supplier',
        component: AddSupplierComponent,
        data: {
          title: 'Add Supplier'
        }
      },
      {
        path: 'todays-suppliers',
        component: TodaysSuppliersComponent,
        data: {
          title: 'Today\'s Suppliers'
        }
      },
      {
        path: 'details/:id',
        component: SupplierDetailsComponent,
        data: {
          title: 'Supplier Details'
        }
      },
      {
        path: 'edit/:id',
        component: EditSupplierComponent,
        data: {
          title: 'Edit Supplier'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule { }
