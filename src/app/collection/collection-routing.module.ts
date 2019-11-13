import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { AddCollectionComponent } from './add-collection/add-collection.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionListComponent,
    data: {
      title: 'Category listing'
    }
  },
  {
    path: 'add',
    component: AddCollectionComponent,
  },
  {
    path: 'edit/:id',
    component: AddCollectionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
