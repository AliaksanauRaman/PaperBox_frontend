import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFlowPageLayoutComponent } from './layouts/login-flow-page-layout/login-flow-page-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

const loginRoutes: Routes = [
  {
    path: '',
    title: 'Pushka',
    component: LoginFlowPageLayoutComponent,
    children: [
      {
        path: '',
        title: 'Pushka | Login',
        component: LoginPageComponent,
      },
      {
        path: 'registration',
        title: 'Pushka | Registration',
        component: RegistrationPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
