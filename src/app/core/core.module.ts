import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AutocompleteTextFieldControlModule } from '../shared/components/autocomplete-text-field-control/autocomplete-text-field-control.module';

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

import {
  COUNTRIES_MAP,
  COUNTRIES_MAP_VALUE,
} from './dependencies/countries-map';
import {
  BELARUSIAN_CITIES,
  BELARUSIAN_CITIES_VALUE,
} from './dependencies/belarusian-cities';
import {
  POLISH_CITIES,
  POLISH_CITIES_VALUE,
} from './dependencies/polish-cities';
import { ALL_CITIES, allCitiesFactory } from './dependencies/all-cities';
import {
  ALL_LOCATIONS,
  allLocationsFactory,
} from './dependencies/all-locations';

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
    ReactiveFormsModule,
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
    AutocompleteTextFieldControlModule,
  ],
  declarations: CORE_MODULE_DECLARATIONS,
  providers: [
    {
      provide: COUNTRIES_MAP,
      useValue: COUNTRIES_MAP_VALUE,
    },
    {
      provide: BELARUSIAN_CITIES,
      useValue: BELARUSIAN_CITIES_VALUE,
    },
    {
      provide: POLISH_CITIES,
      useValue: POLISH_CITIES_VALUE,
    },
    {
      provide: ALL_CITIES,
      useFactory: allCitiesFactory,
      deps: [BELARUSIAN_CITIES, POLISH_CITIES],
    },
    {
      provide: ALL_LOCATIONS,
      useFactory: allLocationsFactory,
      deps: [COUNTRIES_MAP, ALL_CITIES],
    },
  ],
  exports: CORE_MODULE_DECLARATIONS,
})
export class CoreModule {}
