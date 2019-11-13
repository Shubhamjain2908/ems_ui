import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category-listing/category-listing.component';
import { AddCategoryComponent } from './add-category/add-category.component';


const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    data: {
      title: 'Category listing'
    }
  },
  {
    path: 'add',
    component: AddCategoryComponent,
  },
  {
    path: 'edit/:id',
    component: AddCategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule { }
