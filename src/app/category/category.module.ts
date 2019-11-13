import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category-listing/category-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffect } from './effects/category.effect';
import { CategoryService } from './category.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { TreeviewModule } from 'ngx-treeview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    CategoryRoutingModule,
    SharedModule,
    RadioButtonModule,
    DropdownModule
  ],
  declarations: [
    CategoryComponent,
    AddCategoryComponent
  ],
  providers: [CategoryService]
})
export class CategoryModule { }
