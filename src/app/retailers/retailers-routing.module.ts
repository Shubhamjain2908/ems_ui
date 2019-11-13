import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetailerListingComponent } from './retailer-listing/retailer-listing.component';
import { AddRetailerComponent } from './add-retailer/add-retailer.component';
import { TodaysRetailersComponent } from './todays-retailers/todays-retailers.component';
import { RetailerDetailsComponent } from './retailer-details/retailer-details.component';
import { EditRetailerComponent } from './edit-retailer/edit-retailer.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RetailerListingComponent,
        data: {
          title: 'Retailer listing'
        }
      },
      {
        path: 'add-retailer',
        component: AddRetailerComponent,
        data: {
          title: 'Add Retailer'
        }
      },
      {
        path: 'todays-retailers',
        component: TodaysRetailersComponent,
        data: {
          title: 'Today\'s Retailers'
        }
      },
      {
        path: 'details/:id',
        component: RetailerDetailsComponent,
        data: {
          title: 'Retailer Details'
        }
      },
      {
        path: 'edit/:id',
        component: EditRetailerComponent,
        data: {
          title: 'Retailer Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetailersRoutingModule { }
