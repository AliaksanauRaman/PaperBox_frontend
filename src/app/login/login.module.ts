import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { PrimaryButtonComponent } from '../shared/components/primary-button/primary-button.component';
import { CheckboxWithTextControlComponent } from '../shared/components/checkbox-with-text-control/checkbox-with-text-control.component';
import { GirlWithHeartMobileImageComponent } from '../shared/images/girl-with-heart-mobile-image/girl-with-heart-mobile-image.component';
import { ManWithHeartsMobileImageComponent } from '../shared/images/man-with-hearts-mobile-image/man-with-hearts-mobile-image.component';
import { GirlWithHeartDesktopImageComponent } from '../shared/images/girl-with-heart-desktop-image/girl-with-heart-desktop-image.component';
import { ManWithHeartsDesktopImageComponent } from '../shared/images/man-with-hearts-desktop-image/man-with-hearts-desktop-image.component';
import { InputControlModule } from '../shared/components/input-control/input-control.module';
import { LoginRoutingModule } from './login-routing.module';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ToolbarComponent,
    FooterComponent,
    PrimaryButtonComponent,
    CheckboxWithTextControlComponent,
    GirlWithHeartMobileImageComponent,
    ManWithHeartsMobileImageComponent,
    GirlWithHeartDesktopImageComponent,
    ManWithHeartsDesktopImageComponent,
    InputControlModule,
    LoginRoutingModule,
  ],
  declarations: [
    LoginPageComponent,
    SignupPageComponent,
    LoginFormComponent,
    SignupFormComponent,
  ],
  providers: [],
  exports: [],
})
export class LoginModule {}
