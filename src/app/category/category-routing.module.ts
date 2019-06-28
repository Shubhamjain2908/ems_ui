import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category-listing/category-listing.component';
import { SubCategoryComponent } from './subcategory-listing/subcategory-listing.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CategoryComponent,
        data: {
          title: 'Category listing'
        }
      },
      {
        path: 'subcategory',
        component: SubCategoryComponent,
        data: {
          title: 'Sub Category listing'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule { }
