import { NgModule } from '@angular/core';

import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { LoginRoutingModule } from './login-routing.module';

import { LoginFlowPageLayoutComponent } from './layouts/login-flow-page-layout/login-flow-page-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

@NgModule({
  imports: [ToolbarComponent, FooterComponent, LoginRoutingModule],
  declarations: [
    LoginFlowPageLayoutComponent,
    LoginPageComponent,
    RegistrationPageComponent,
  ],
  providers: [],
  exports: [],
})
export class LoginModule {}
