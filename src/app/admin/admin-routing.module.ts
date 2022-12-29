import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminWorkPageLayoutComponent } from './layouts/admin-work-page-layout/admin-work-page-layout.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminHelpOffersPageComponent } from './pages/admin-help-offers-page/admin-help-offers-page.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminWorkPageLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'help-offers',
      },
      {
        path: 'help-offers',
        component: AdminHelpOffersPageComponent,
      },
    ],
  },
  {
    path: 'login',
    component: AdminLoginPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
