import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodaysCustomersComponent } from './todays-customers/todays-customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    MultiSelectModule
  ],
  declarations: [CustomerListingComponent, TodaysCustomersComponent, AddCustomerComponent, EditCustomerComponent, CustomerDetailsComponent]
})
export class CustomersModule { }
