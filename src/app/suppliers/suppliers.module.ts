import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierListingComponent } from './supplier-listing/supplier-listing.component';
import { SupplierRoutingModule } from './suppliers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { TodaysSuppliersComponent } from './todays-suppliers/todays-suppliers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditorModule } from 'primeng/editor';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MultiSelectModule,
    EditorModule,
    AutoCompleteModule,
    ToggleButtonModule
  ],
  declarations: [SupplierListingComponent, AddSupplierComponent, TodaysSuppliersComponent, SupplierDetailsComponent, EditSupplierComponent]
})
export class SuppliersModule { }
