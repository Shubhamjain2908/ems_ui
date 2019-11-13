import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetailerListingComponent } from './retailer-listing/retailer-listing.component';
import { RetailersRoutingModule } from './retailers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodaysRetailersComponent } from './todays-retailers/todays-retailers.component';
import { AddRetailerComponent } from './add-retailer/add-retailer.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RetailerDetailsComponent } from './retailer-details/retailer-details.component';
import { EditRetailerComponent } from './edit-retailer/edit-retailer.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { EditorModule } from 'primeng/editor';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    RetailersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    MultiSelectModule,
    EditorModule,
    AutoCompleteModule,
    ToggleButtonModule
  ],
  declarations: [RetailerListingComponent, TodaysRetailersComponent, AddRetailerComponent, RetailerDetailsComponent, EditRetailerComponent]
})
export class RetailersModule { }
