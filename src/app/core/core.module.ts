import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { PlusIconModule } from '../shared/icons/plus-icon/plus-icon.module';
import { CalendarIconModule } from '../shared/icons/calendar-icon/calendar-icon.module';
import { LocationIconModule } from '../shared/icons/location-icon/location-icon.module';
import { InputControlModule } from '../shared/components/input-control/input-control.module';
import { PhoneControlModule } from '../shared/components/phone-control/phone-control.module';
import { DateControlModule } from '../shared/components/date-control/date-control.module';
import { TextareaFieldControlModule } from '../shared/components/textarea-field-control/textarea-field-control.module';
import { AutocompleteControlModule } from '../shared/components/autocomplete-control/autocomplete-control.module';
import { SpinnerModule } from '../shared/components/spinner/spinner.module';
import { CheckboxWithTextControlComponent } from '../shared/components/checkbox-with-text-control/checkbox-with-text-control.component';
import { WhiteSquareButtonComponent } from '../shared/components/white-square-button/white-square-button.component';
import { ManWithMailImageComponent } from '../shared/images/man-with-mail-image/man-with-mail-image.component';
import { ManWithGlobeImageComponent } from '../shared/images/man-with-globe-image/man-with-globe-image.component';
import { FeedbackImageComponent } from '../shared/images/feedback-image/feedback-image.component';
import { GirlInCardMobileImageComponent } from '../shared/images/girl-in-card-mobile-image/girl-in-card-mobile-image.component';
import { GirlInCardDesktopImageComponent } from '../shared/images/girl-in-card-desktop-image/girl-in-card-desktop-image.component';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

import { IndexPageLayoutComponent } from './layouts/index-page-layout/index-page-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ActionsComponent } from './components/actions/actions.component';
import { MainComponent } from './components/main/main.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { DynamicPhoneListControlComponent } from './components/dynamic-phone-list-control/dynamic-phone-list-control.component';
import { LocationsControlComponent } from './components/locations-control/locations-control.component';
import { ErrorSnackBarComponent } from './components/error-snack-bar/error-snack-bar.component';
import { InfoSnackBarComponent } from './components/info-snack-bar/info-snack-bar.component';
import { SuccessCreateHelpOfferSectionComponent } from './sections/success-create-help-offer-section/success-create-help-offer-section.component';
import { SuccessCreateHelpItemSectionComponent } from './sections/success-create-help-item-section/success-create-help-item-section.component';
import { SuccessCreateHelpRequestSectionComponent } from './sections/success-create-help-request-section/success-create-help-request-section.component';
import { SuccessCreateFeedbackSectionComponent } from './sections/success-create-feedback-section/success-create-feedback-section.component';
import { CreateFeedbackDialogComponent } from './dialogs/create-feedback-dialog/create-feedback-dialog.component';
import { CreateHelpOfferDialogComponent } from './dialogs/create-help-offer-dialog/create-help-offer-dialog.component';
import { CreateHelpRequestDialogComponent } from './dialogs/create-help-request-dialog/create-help-request-dialog.component';

import { WINDOW, WINDOW_VALUE } from './dependencies/window';
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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DialogModule,
    TranslateModule,
    MatRippleModule,
    MatMenuModule,
    MatSnackBarModule,
    ClipboardModule,
    PlusIconModule,
    CalendarIconModule,
    LocationIconModule,
    InputControlModule,
    PhoneControlModule,
    DateControlModule,
    TextareaFieldControlModule,
    AutocompleteControlModule,
    SpinnerModule,
    CheckboxWithTextControlComponent,
    WhiteSquareButtonComponent,
    ManWithMailImageComponent,
    ManWithGlobeImageComponent,
    FeedbackImageComponent,
    GirlInCardMobileImageComponent,
    GirlInCardDesktopImageComponent,
    ToolbarComponent,
    FooterComponent,
  ],
  declarations: [
    IndexPageLayoutComponent,
    HeaderComponent,
    ActionsComponent,
    MainComponent,
    NavigationMenuComponent,
    DynamicPhoneListControlComponent,
    LocationsControlComponent,
    ErrorSnackBarComponent,
    InfoSnackBarComponent,
    SuccessCreateHelpOfferSectionComponent,
    SuccessCreateHelpItemSectionComponent,
    SuccessCreateHelpRequestSectionComponent,
    SuccessCreateFeedbackSectionComponent,
    CreateFeedbackDialogComponent,
    CreateHelpOfferDialogComponent,
    CreateHelpRequestDialogComponent,
  ],
  providers: [
    {
      provide: WINDOW,
      useValue: WINDOW_VALUE,
    },
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
  ],
})
export class CoreModule {}
