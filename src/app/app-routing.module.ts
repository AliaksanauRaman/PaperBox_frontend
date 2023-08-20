import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppPageLayoutComponent } from './core/layouts/app-page-layout/app-page-layout.component';
import { MainSectionLayoutComponent } from './core/layouts/main-section-layout/main-section-layout.component';
import { PublishedHelpOffersPageComponent } from './published-applications/pages/published-help-offers-page/published-help-offers-page.component';
import { PublishedHelpRequestsPageComponent } from './published-applications/pages/published-help-requests-page/published-help-requests-page.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';

import { LoggedOutUserGuard } from './core/guards/logged-out-user.guard';

import { Page } from './shared/enums/page.enum';

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
            redirectTo: `/${Page.HELP_OFFERS}`,
          },
          {
            path: Page.HELP_OFFERS,
            title: 'Pushka | Help Offers',
            component: PublishedHelpOffersPageComponent,
          },
          {
            path: Page.HELP_REQUESTS,
            title: 'Pushka | Looking for help',
            component: PublishedHelpRequestsPageComponent,
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
        path: Page.NOT_FOUND,
        title: 'Pushka | 404',
        component: NotFoundPageComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: `/${Page.NOT_FOUND}`,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
