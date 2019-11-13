import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetailerServiceListComponent } from './retailer-service-list/retailer-service-list.component';
import { RetailerServiceAddComponent } from './retailer-service-add/retailer-service-add.component';
import { RetailerServiceDetailComponent } from './retailer-service-detail/retailer-service-detail.component';
import { RetailerServiceImagesComponent } from './retailer-service-images/retailer-service-images.component';

const routes: Routes = [
  {
    path: '',
    component: RetailerServiceListComponent
  },
  {
    path: 'add',
    component: RetailerServiceAddComponent
  },
  {
    path: 'detail/:serviceId/images',
    component: RetailerServiceImagesComponent
  },
  {
    path: 'edit/:serviceId',
    component: RetailerServiceAddComponent
  },
  {
    path: 'detail/:serviceId',
    component: RetailerServiceDetailComponent
  },
  {
    path: ':supplierId',
    component: RetailerServiceListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerServiceRoutingModule { }
