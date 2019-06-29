import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseComponent } from './expense-listing/expense-listing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    ExpenseRoutingModule
  ],
  declarations: [
    ExpenseComponent
  ]
})
export class ExpenseModule { }
