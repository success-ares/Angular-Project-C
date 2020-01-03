import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppOutletComponent } from './app-outlet.component';

export const routes: Routes = [
  {
    path: '',
    component: AppOutletComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
      },
      {
        path: '',
        // pathMatch: 'full',
        loadChildren: './front/front.module#FrontModule'
      },
      // {
      //   path: '**',
      //   redirectTo: ''
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// @NgModule({
//   imports: [ RouterModule.forRoot(routes) ],
//   exports: [ RouterModule ]
// })
// export class AppRoutingModule {}
