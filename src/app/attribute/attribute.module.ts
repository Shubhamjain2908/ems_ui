import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeRoutingModule } from './attribute-routing.module';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { AttributeService } from './attribute.service';
import { EffectsModule } from '@ngrx/effects';
import { AttributeEffect } from './effects/attribute.effect';
import { AttributeChoiceEffect } from './effects/attribute-choice.effect';
import { AddAttributeChoiceComponent } from './add-attribute-choice/add-attribute-choice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
import { NgxTreeSelectModule } from 'ngx-tree-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxTreeSelectModule.forRoot({
      allowFilter: true,
      filterPlaceholder: 'Category name',
      maxVisibleItemCount: 5,
      idField: 'id',
      textField: 'name',
      childrenField: 'children',
      allowParentSelection: false,
      expandMode: 'Selection'
    }),
    StoreModule.forFeature('attribute', reducers),
    EffectsModule.forFeature([AttributeEffect, AttributeChoiceEffect]),
    AttributeRoutingModule
  ],
  declarations: [AttributeListComponent, AddAttributeChoiceComponent, AddAttributeComponent],
  providers: [AttributeService]
})
export class AttributeModule { }
