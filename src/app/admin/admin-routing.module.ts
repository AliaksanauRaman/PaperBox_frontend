import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminWorkPageLayoutComponent } from './layouts/admin-work-page-layout/admin-work-page-layout.component';
import { AdminHelpOffersPageComponent } from './pages/admin-help-offers-page/admin-help-offers-page.component';
import { AdminHelpRequestsPageComponent } from './pages/admin-help-requests-page/admin-help-requests-page.component';
import { AdminUsersPageComponent } from './pages/admin-users-page/admin-users-page.component';
import { AdminSettingsPageComponent } from './pages/admin-settings-page/admin-settings-page.component';

import { AdminIsLoggedInGuard } from './guards/admin-is-logged-in.guard';

const adminRoutes: Routes = [
  {
    path: 'login',
    component: AdminLoginPageComponent,
    title: 'Admin | Login',
  },
  {
    path: '',
    component: AdminWorkPageLayoutComponent,
    canActivateChild: [AdminIsLoggedInGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'help-offers',
      },
      {
        path: 'help-offers',
        component: AdminHelpOffersPageComponent,
        title: 'Admin | Help offers',
      },
      {
        path: 'help-requests',
        component: AdminHelpRequestsPageComponent,
        title: 'Admin | Help requests',
      },
      {
        path: 'users',
        component: AdminUsersPageComponent,
        title: 'Admin | Users',
      },
      {
        path: 'settings',
        component: AdminSettingsPageComponent,
        title: 'Admin | Settings',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/admin/help-offers',
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
