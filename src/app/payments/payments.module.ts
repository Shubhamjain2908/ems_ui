import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { PaymentsEffect } from './effects/payments.effect';
import { PaymentsService } from './payments.service';
import { NgxTreeSelectModule } from 'ngx-tree-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEffect } from './effects/user.effect';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaymentsDetailComponent } from './payments-detail/payments-detail.component';
import { FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TagEffect } from 'app/tag/effects/tag.effects';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('payments', reducers),
    EffectsModule.forFeature([PaymentsEffect, UserEffect]),
    PaymentsRoutingModule,
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
    DropdownModule,
    MultiSelectModule,
    FileUploadModule,
    EditorModule,
    RadioButtonModule,
    InputSwitchModule,
    AutoCompleteModule
  ],
  declarations: [PaymentsListComponent, PaymentsDetailComponent],
  providers: [PaymentsService]
})
export class PaymentsModule { }
