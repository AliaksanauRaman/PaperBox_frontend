import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginMainPageComponent } from './pages/login-main-page/login-main-page.component';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoginMainPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
