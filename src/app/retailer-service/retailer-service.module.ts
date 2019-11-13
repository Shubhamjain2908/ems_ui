import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailerServiceRoutingModule } from './retailer-service-routing.module';
import { RetailerServiceListComponent } from './retailer-service-list/retailer-service-list.component';
import { RetailerServiceAddComponent } from './retailer-service-add/retailer-service-add.component';
import { SharedModule } from 'app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { RetailerServiceEffect } from './effects/retailer-service.effect';
import { RetailerServiceService } from './retailer-service.service';
import { NgxTreeSelectModule } from 'ngx-tree-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEffect } from './effects/user.effect';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RetailerServiceDetailComponent } from './retailer-service-detail/retailer-service-detail.component';
import { RetailerServiceImagesComponent } from './retailer-service-images/retailer-service-images.component';
import { FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('retailer-service', reducers),
    EffectsModule.forFeature([RetailerServiceEffect, UserEffect]),
    RetailerServiceRoutingModule,
    NgxTreeSelectModule.forRoot({
      allowFilter: true,
      filterPlaceholder: 'Category name',
      maxVisibleItemCount: 5,
      idField: 'id',
      textField: 'name',
      childrenField: 'children',
      allowParentSelection: false,
      expandMode: 'Selection'
    }),
    DropdownModule,
    MultiSelectModule,
    FileUploadModule,
    EditorModule,
    InputSwitchModule
  ],
  declarations: [RetailerServiceListComponent, RetailerServiceAddComponent, RetailerServiceDetailComponent, RetailerServiceImagesComponent],
  providers: [RetailerServiceService]
})
export class RetailerServiceModule { }
