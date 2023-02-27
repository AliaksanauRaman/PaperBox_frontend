import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatRippleModule } from '@angular/material/core';

import { PlusIconModule } from '../shared/icons/plus-icon/plus-icon.module';
import { CalendarIconModule } from '../shared/icons/calendar-icon/calendar-icon.module';
import { LocationIconModule } from '../shared/icons/location-icon/location-icon.module';
import { ManWithGlobeImageModule } from '../shared/images/man-with-globe-image/man-with-globe-image.module';
import { ManWithMailImageModule } from '../shared/images/man-with-mail-image/man-with-mail-image.module';
import { FeedbackImageModule } from '../shared/images/feedback-image/feedback-image.module';
import { InputControlModule } from '../shared/components/input-control/input-control.module';
import { PhoneControlModule } from '../shared/components/phone-control/phone-control.module';
import { DateControlModule } from '../shared/components/date-control/date-control.module';
import { TextareaFieldControlModule } from '../shared/components/textarea-field-control/textarea-field-control.module';
import { AutocompleteControlModule } from '../shared/components/autocomplete-control/autocomplete-control.module';
import { SpinnerModule } from '../shared/components/spinner/spinner.module';

import { IndexPageLayoutComponent } from './layouts/index-page-layout/index-page-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { ActionsComponent } from './components/actions/actions.component';
import { MainComponent } from './components/main/main.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeaveFeedbackButtonComponent } from './components/leave-feedback-button/leave-feedback-button.component';
import { DynamicPhoneListControlComponent } from './components/dynamic-phone-list-control/dynamic-phone-list-control.component';
import { LocationsControlComponent } from './components/locations-control/locations-control.component';
import { SuccessCreateFeedbackViewComponent } from './components/success-create-feedback-view/success-create-feedback-view.component';
import { FeedbackDialogComponent } from './dialogs/feedback-dialog/feedback-dialog.component';
import { OfferHelpDialogComponent } from './dialogs/offer-help-dialog/offer-help-dialog.component';
import { FindHelpDialogComponent } from './dialogs/find-help-dialog/find-help-dialog.component';

import {
  LOCAL_STORAGE,
  LOCAL_STORAGE_VALUE,
} from './dependencies/local-storage';
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
import {
  GEORGIAN_CITIES,
  GEORGIAN_CITIES_VALUE,
} from './dependencies/georgian-cities';
import { ALL_CITIES, allCitiesFactory } from './dependencies/all-cities';
import {
  ALL_LOCATIONS,
  allLocationsFactory,
} from './dependencies/all-locations';
import {
  PHONE_DIALLING_CODES,
  PHONE_DIALLING_CODES_VALUE,
} from './dependencies/phone-dialling-codes';
import { CoreEventsProcessorService } from './services/core-events-processor.service';

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
  DynamicPhoneListControlComponent,
  LocationsControlComponent,
  SuccessCreateFeedbackViewComponent,
  FeedbackDialogComponent,
  OfferHelpDialogComponent,
  FindHelpDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DialogModule,
    TranslateModule,
    MatRippleModule,
    PlusIconModule,
    CalendarIconModule,
    LocationIconModule,
    ManWithGlobeImageModule,
    ManWithMailImageModule,
    FeedbackImageModule,
    InputControlModule,
    PhoneControlModule,
    DateControlModule,
    TextareaFieldControlModule,
    AutocompleteControlModule,
    SpinnerModule,
  ],
  declarations: CORE_MODULE_DECLARATIONS,
  providers: [
    {
      provide: LOCAL_STORAGE,
      useValue: LOCAL_STORAGE_VALUE,
    },
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
      provide: GEORGIAN_CITIES,
      useValue: GEORGIAN_CITIES_VALUE,
    },
    {
      provide: ALL_CITIES,
      useFactory: allCitiesFactory,
      deps: [BELARUSIAN_CITIES, POLISH_CITIES, GEORGIAN_CITIES],
    },
    {
      provide: ALL_LOCATIONS,
      useFactory: allLocationsFactory,
      deps: [COUNTRIES_MAP, ALL_CITIES],
    },
    {
      provide: PHONE_DIALLING_CODES,
      useValue: PHONE_DIALLING_CODES_VALUE,
    },
    CoreEventsProcessorService,
  ],
  exports: CORE_MODULE_DECLARATIONS,
})
export class CoreModule {
  constructor(
    private readonly coreEventsProcessorService: CoreEventsProcessorService
  ) {
    this.coreEventsProcessorService.setUpProcessors();
  }
}
