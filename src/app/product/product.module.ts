import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { SharedModule } from 'app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from './effects/product.effect';
import { ProductService } from './product.service';
import { NgxTreeSelectModule } from 'ngx-tree-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEffect } from './effects/user.effect';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import { FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TagEffect } from 'app/tag/effects/tag.effects';
import { ProductUploadBulkComponent } from './product-upload-bulk/product-upload-bulk.component';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('product', reducers),
    EffectsModule.forFeature([ProductEffect, UserEffect]),
    ProductRoutingModule,
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
    RadioButtonModule,
    InputSwitchModule,
    AutoCompleteModule
  ],
  declarations: [ProductListComponent, ProductUploadComponent, ProductDetailComponent, ProductImagesComponent, ProductUploadBulkComponent],
  providers: [ProductService]
})
export class ProductModule { }
