import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InnerPageLayoutComponent } from './layouts/inner-page-layout/inner-page-layout.component';

import { HelpOffersPageComponent } from './pages/help-offers-page/help-offers-page.component';
import { HelpRequestsPageComponent } from './pages/help-requests-page/help-requests-page.component';

// TODO
// import { MainPageComponent } from './pages/main/main-page.component';

const routes: Routes = [
  // TODO
  // {
  //   path: '',
  //   component: MainPageComponent,
  // }
  {
    path: '',
    component: InnerPageLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/help-offers',
      },
      {
        path: 'help-offers',
        component: HelpOffersPageComponent,
      },
      {
        path: 'help-requests',
        component: HelpRequestsPageComponent,
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
