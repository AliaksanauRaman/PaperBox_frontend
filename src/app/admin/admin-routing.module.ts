import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';

const adminRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: AdminLoginPageComponent,
  },
  {
    path: 'main',
    component: AdminMainPageComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
