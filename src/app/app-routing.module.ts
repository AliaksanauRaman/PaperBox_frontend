import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexPageLayoutComponent } from './core/layouts/index-page-layout/index-page-layout.component';

const routes: Routes = [
  {
    path: '',
    component: IndexPageLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/help-offers',
      },
      {
        path: 'help-offers',
        loadChildren: () => import('./help-offers/help-offers.module').then(m => m.HelpOffersModule),
      },
      {
        path: 'help-requests',
        loadChildren: () => import('./help-requests/help-requests.module').then(m => m.HelpRequestsModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
      },
      {
        path: '**',
        redirectTo: '/help-offers',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
