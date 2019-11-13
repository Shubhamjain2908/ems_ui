import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagRoutingModule } from './tag-routing.module';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagService } from './tag.service';
import { EffectsModule } from '@ngrx/effects';
import { TagEffect } from './effects/tag.effects';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagUploadComponent } from './tag-upload/tag-upload.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TagRoutingModule,
    EffectsModule.forFeature([TagEffect])
  ],
  declarations: [TagListComponent, TagUploadComponent],
  providers: [TagService]
})
export class TagModule { }
