import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category-listing/category-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubCategoryComponent } from './subcategory-listing/subcategory-listing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    CategoryRoutingModule
  ],
  declarations: [
    CategoryComponent,
    SubCategoryComponent
  ]
})
export class CategoryModule { }
