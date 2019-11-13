import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListingComponent } from './customer-listing/customer-listing.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { TodaysCustomersComponent } from './todays-customers/todays-customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CustomerListingComponent,
        data: {
          title: 'Customer listing'
        }
      },
      {
        path: 'add-customer',
        component: AddCustomerComponent,
        data: {
          title: 'Add Customer'
        }
      },
      {
        path: 'todays-customers',
        component: TodaysCustomersComponent,
        data: {
          title: 'Today\'s Customers'
        }
      },
      {
        path: 'details/:id',
        component: CustomerDetailsComponent,
        data: {
          title: 'Customer Details'
        }
      },
      {
        path: 'edit/:id',
        component: EditCustomerComponent,
        data: {
          title: 'Customer Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule { }
