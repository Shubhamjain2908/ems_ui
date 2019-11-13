import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagUploadComponent } from './tag-upload/tag-upload.component';

const routes: Routes = [
  {
    path: '',
    component: TagListComponent
  },
  {
    path: 'add',
    component: TagUploadComponent,
  },
  {
    path: 'edit/:id',
    component: TagUploadComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
