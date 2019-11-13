import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerService } from './banner.service';
import { reducers } from 'app/banner/reducers';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { BannerEffect } from 'app/banner/effects/banner.effect';
import { BannerComponent } from './banner-listing/banner-listing.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { BannerRoutingModule } from './banner-routing.module';
import { CategoryService } from 'app/category/category.service';
import { OptionEffect } from './effects/options.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    BannerRoutingModule,
    SharedModule,
    StoreModule.forFeature('banner', reducers),
    EffectsModule.forFeature([BannerEffect, OptionEffect]),
    RadioButtonModule,
    DropdownModule
  ],
  declarations: [
    BannerComponent,
    AddBannerComponent
  ],
  providers: [BannerService, CategoryService]
})
export class BannerModule { }