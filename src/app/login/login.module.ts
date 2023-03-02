import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';

import { LoginMainPageComponent } from './pages/login-main-page/login-main-page.component';

@NgModule({
  imports: [LoginRoutingModule],
  declarations: [LoginMainPageComponent],
  providers: [],
  exports: [],
})
export class LoginModule {}
