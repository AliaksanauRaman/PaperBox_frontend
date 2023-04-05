import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppPageLayoutComponent } from './core/layouts/app-page-layout/app-page-layout.component';
import { MainSectionLayoutComponent } from './core/layouts/main-section-layout/main-section-layout.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    title: 'Pushka',
    component: AppPageLayoutComponent,
    children: [
      {
        path: '',
        component: MainSectionLayoutComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/help-offers',
          },
          {
            path: 'help-offers',
            title: 'Pushka | Help Offers',
            loadChildren: () =>
              import('./help-offers/help-offers.module').then(
                (m) => m.HelpOffersModule
              ),
          },
          {
            path: 'help-requests',
            title: 'Pushka | Looking for help',
            loadChildren: () =>
              import('./help-requests/help-requests.module').then(
                (m) => m.HelpRequestsModule
              ),
          },
        ],
      },
      {
        path: 'users-entry',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
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
  exports: [RouterModule],
})
export class AppRoutingModule {}
