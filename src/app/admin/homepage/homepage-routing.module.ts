import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage.component';
import { EditSectionComponent } from './edit-section.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    data: {
      title: 'Homepage'
    }
  },
  {
    path: 'carousel/:id',
    component: EditSectionComponent,
    data: {
      title: 'Edit Carousel'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule {}
