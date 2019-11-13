import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AddAttributeChoiceComponent } from './add-attribute-choice/add-attribute-choice.component';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';

const routes: Routes = [
  {
    path: '',
    component: AttributeListComponent,
    data: {
      title: 'Attribute listing'
    }
  },
  {
    path: 'add',
    component: AddAttributeComponent,
  },
  {
    path: 'edit/:attributeId',
    component: AddAttributeComponent,
  },
  {
    path: ':attributeId',
    component: AttributeListComponent,
  },
  {
    path: ':attributeId/add',
    component: AddAttributeChoiceComponent,
  },
  {
    path: ':attributeId/edit/:attributeChoiceId',
    component: AddAttributeChoiceComponent,
  },
  // {
  //   path: 'add',
  //   component: AddCategoryComponent,
  // },
  // {
  //   path: 'edit/:id',
  //   component: AddCategoryComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeRoutingModule { }
