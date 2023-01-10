import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';

import { PlusIconModule } from '../shared/icons/plus-icon/plus-icon.module';
import { ManWithGlobeImageModule } from '../shared/images/man-with-globe-image/man-with-globe-image.module';
import { FeedbackImageModule } from '../shared/images/feedback-image/feedback-image.module';
import { InputControlModule } from '../shared/components/input-control/input-control.module';

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

const CORE_DECLARATIONS = [
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
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DialogModule,
    PlusIconModule,
    ManWithGlobeImageModule,
    FeedbackImageModule,
    InputControlModule,
  ],
  declarations: CORE_DECLARATIONS,
  exports: CORE_DECLARATIONS,
})
export class CoreModule {}
