import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmUserResolver } from './resolvers/confirm-user.resolver';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ConfirmUserPageComponent } from './pages/confirm-user-page/confirm-user-page.component';

const loginRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    title: 'Pushka | Log In',
    component: LoginPageComponent,
  },
  {
    path: 'signup',
    title: 'Pushka | Sign Up',
    component: SignupPageComponent,
  },
  {
    path: 'confirm-user',
    title: 'Pushka | Confirm user',
    component: ConfirmUserPageComponent,
    resolve: {
      userConfirmationState: ConfirmUserResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
