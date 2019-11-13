import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionRoutingModule } from './collection-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CollectionEffect } from './effects/collection.effect';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { CollectionService } from './collection.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProductEffect } from 'app/product/effects/product.effect';
import { ProductService } from 'app/product/product.service';
import { NgxTreeSelectModule } from 'ngx-tree-select';
import { UserEffect } from './effects/user.effect';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AutoCompleteModule,
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
    StoreModule.forFeature('collection', reducers),
    EffectsModule.forFeature([CollectionEffect, ProductEffect, UserEffect]),
    CollectionRoutingModule
  ],
  declarations: [CollectionListComponent, AddCollectionComponent],
  providers: [CollectionService, ProductService]
})
export class CollectionModule { }
