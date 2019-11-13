import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferListComponent } from './offer-list/offer-list.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { OfferService } from './offer.service';
import { CollectionService } from 'app/collection/collection.service';
import { ProductService } from 'app/product/product.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from 'app/product/effects/product.effect';
import { CollectionEffect } from 'app/collection/effects/collection.effect';
import { OfferEffect } from './effects/offer.effect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AutoCompleteModule,
    RadioButtonModule,
    CalendarModule,
    StoreModule.forFeature('offer', reducers),
    EffectsModule.forFeature([ProductEffect, CollectionEffect, OfferEffect]),
    OfferRoutingModule
  ],
  declarations: [OfferListComponent, AddOfferComponent],
  providers: [OfferService, CollectionService, ProductService]
})
export class OfferModule { }
