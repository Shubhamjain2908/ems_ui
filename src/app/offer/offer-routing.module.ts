import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferListComponent } from './offer-list/offer-list.component';
import { AddOfferComponent } from './add-offer/add-offer.component';

const routes: Routes = [
  {
    path: '',
    component: OfferListComponent
  },
  {
    path: 'add',
    component: AddOfferComponent,
  },
  {
    path: 'edit/:id',
    component: AddOfferComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
