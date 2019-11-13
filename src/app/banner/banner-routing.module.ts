import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './banner-listing/banner-listing.component';
import { AddBannerComponent } from './add-banner/add-banner.component';

const routes: Routes = [
  {
    path: 'list',
    component: BannerComponent,
    data: {
      title: 'Banner listing'
    }
  },
  {
    path: 'add',
    component: AddBannerComponent,
  },
  {
    path: 'edit/:id',
    component: AddBannerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannerRoutingModule { }
