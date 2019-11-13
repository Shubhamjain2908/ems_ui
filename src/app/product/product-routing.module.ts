import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import { ProductUploadBulkComponent } from './product-upload-bulk/product-upload-bulk.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'add',
    component: ProductUploadComponent
  },
  {
    path: 'upload',
    component: ProductUploadBulkComponent
  },
  {
    path: 'detail/:productId/images',
    component: ProductImagesComponent
  },
  {
    path: 'edit/:productId',
    component: ProductUploadComponent
  },
  {
    path: 'detail/:productId',
    component: ProductDetailComponent
  },
  {
    path: ':supplierId',
    component: ProductListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
