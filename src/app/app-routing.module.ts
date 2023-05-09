import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppPageLayoutComponent } from './core/layouts/app-page-layout/app-page-layout.component';
import { MainSectionLayoutComponent } from './core/layouts/main-section-layout/main-section-layout.component';
import { HelpOffersPageComponent } from './applications/pages/help-offers-page/help-offers-page.component';
import { HelpRequestsPageComponent } from './applications/pages/help-requests-page/help-requests-page.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';

import { LoggedOutUserGuard } from './core/guards/logged-out-user.guard';

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
            component: HelpOffersPageComponent,
          },
          {
            path: 'help-requests',
            title: 'Pushka | Looking for help',
            component: HelpRequestsPageComponent,
          },
        ],
      },
      {
        path: 'users-entry',
        canActivate: [LoggedOutUserGuard],
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'not-found',
        title: 'Pushka | 404',
        component: NotFoundPageComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
