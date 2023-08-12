import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { PrimaryButtonComponent } from '../shared/components/primary-button/primary-button.component';
import { CheckboxWithTextControlComponent } from '../shared/components/checkbox-with-text-control/checkbox-with-text-control.component';
import { InputControlModule } from '../shared/components/input-control/input-control.module';
import { RecaptchaControlComponent } from '../shared/components/recaptcha-control/recaptcha-control.component';
import { LoginRoutingModule } from './login-routing.module';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ConfirmUserPageComponent } from './pages/confirm-user-page/confirm-user-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SuccessConfirmUserViewComponent } from './views/success-confirm-user-view/success-confirm-user-view.component';
import { FailedConfirmUserViewComponent } from './views/failed-confirm-user-view/failed-confirm-user-view.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    AngularSvgIconModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ToolbarComponent,
    FooterComponent,
    PrimaryButtonComponent,
    CheckboxWithTextControlComponent,
    InputControlModule,
    RecaptchaControlComponent,
    LoginRoutingModule,
  ],
  declarations: [
    LoginPageComponent,
    SignupPageComponent,
    ConfirmUserPageComponent,
    LoginFormComponent,
    SignupFormComponent,
    SuccessConfirmUserViewComponent,
    FailedConfirmUserViewComponent,
  ],
})
export class LoginModule {}
