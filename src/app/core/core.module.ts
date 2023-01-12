import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { PlusIconModule } from '../shared/icons/plus-icon/plus-icon.module';
import { DirectionIconModule } from '../shared/icons/direction-icon/direction-icon.module';
import { CalendarIconModule } from '../shared/icons/calendar-icon/calendar-icon.module';
import { LocationIconModule } from '../shared/icons/location-icon/location-icon.module';
import { ManWithGlobeImageModule } from '../shared/images/man-with-globe-image/man-with-globe-image.module';
import { FeedbackImageModule } from '../shared/images/feedback-image/feedback-image.module';
import { InputControlModule } from '../shared/components/input-control/input-control.module';
import { TextareaFieldControlModule } from '../shared/components/textarea-field-control/textarea-field-control.module';

import { IndexPageLayoutComponent } from './layouts/index-page-layout/index-page-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { ActionsComponent } from './components/actions/actions.component';
import { MainComponent } from './components/main/main.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeaveFeedbackButtonComponent } from './components/leave-feedback-button/leave-feedback-button.component';
import { FeedbackDialogComponent } from './dialogs/feedback-dialog/feedback-dialog.component';
import { OfferHelpDialogComponent } from './dialogs/offer-help-dialog/offer-help-dialog.component';

const CORE_MODULE_DECLARATIONS = [
  IndexPageLayoutComponent,
  HeaderComponent,
  ToolbarComponent,
  LanguageSwitcherComponent,
  ActionsComponent,
  MainComponent,
  NavigationMenuComponent,
  FooterComponent,
  LeaveFeedbackButtonComponent,
  FeedbackDialogComponent,
  OfferHelpDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DialogModule,
    TranslateModule,
    PlusIconModule,
    DirectionIconModule,
    CalendarIconModule,
    LocationIconModule,
    ManWithGlobeImageModule,
    FeedbackImageModule,
    InputControlModule,
    TextareaFieldControlModule,
  ],
  declarations: CORE_MODULE_DECLARATIONS,
  exports: CORE_MODULE_DECLARATIONS,
})
export class CoreModule {}
