import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HttpErrorResponseCardModule } from '../shared/components/http-error-response-card/http-error-response-card.module';
import { HttpErrorMessagePipeModule } from '../shared/pipes/http-error-message/http-error-message-pipe.module';
import { LaconicPlaceLabelFromLocationValuePipeModule } from '../shared/pipes/laconic-place-label-from-location-value/laconic-place-label-from-location-value-pipe.module';
import { DatesPipe } from './../shared/pipes/dates.pipe';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminHelpRequestsPageComponent } from './pages/admin-help-requests-page/admin-help-requests-page.component';
import { AdminUsersPageComponent } from './pages/admin-users-page/admin-users-page.component';
import { AdminSettingsPageComponent } from './pages/admin-settings-page/admin-settings-page.component';
import { AdminLoginCardComponent } from './components/admin-login-card/admin-login-card.component';
import { AdminHelpOffersPageComponent } from './pages/admin-help-offers-page/admin-help-offers-page.component';
import { AdminWorkPageLayoutComponent } from './layouts/admin-work-page-layout/admin-work-page-layout.component';
import { AdminHelpOffersGridComponent } from './components/admin-help-offers-grid/admin-help-offers-grid.component';
import { AdminHelpOfferCardComponent } from './components/admin-help-offer-card/admin-help-offer-card.component';
import { AdminHelpOfferStatusComponent } from './components/admin-help-offer-status/admin-help-offer-status.component';
import { AdminHelpOfferDetailsComponent } from './components/admin-help-offer-details/admin-help-offer-details.component';
import { AdminDeletedHelpOfferDialogViewComponent } from './components/admin-deleted-help-offer-dialog-view/admin-deleted-help-offer-dialog-view.component';
import { AdminFullHelpRequestsListComponent } from './components/admin-full-help-requests-list/admin-full-help-requests-list.component';
import { AdminFullApplicationsTableComponent } from './components/admin-full-applications-table/admin-full-applications-table.component';
import { AdminManageHelpOfferDialogComponent } from './dialogs/admin-manage-help-offer-dialog/admin-manage-help-offer-dialog.component';

import { AdminHelpOffersHttpService } from './services/admin-help-offers-http.service';
import { AdminHelpOffersService } from './services/admin-help-offers.service';
import { AdminEventsProcessorService } from './services/admin-events-processor.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatMenuModule,
    MatTooltipModule,
    HttpErrorResponseCardModule,
    HttpErrorMessagePipeModule,
    LaconicPlaceLabelFromLocationValuePipeModule,
    DatesPipe,
    AdminRoutingModule,
  ],
  declarations: [
    AdminLoginPageComponent,
    AdminLoginCardComponent,
    AdminHelpOffersPageComponent,
    AdminHelpRequestsPageComponent,
    AdminUsersPageComponent,
    AdminSettingsPageComponent,
    AdminWorkPageLayoutComponent,
    AdminHelpOffersGridComponent,
    AdminHelpOfferCardComponent,
    AdminHelpOfferStatusComponent,
    AdminHelpOfferDetailsComponent,
    AdminDeletedHelpOfferDialogViewComponent,
    AdminFullHelpRequestsListComponent,
    AdminFullApplicationsTableComponent,
    AdminManageHelpOfferDialogComponent,
  ],
  providers: [
    AdminHelpOffersHttpService,
    AdminHelpOffersService,
    AdminEventsProcessorService,
  ],
  exports: [],
})
export class AdminModule {
  // TODO: Probably it must be deleted
  constructor(
    private readonly adminEventsProcessorService: AdminEventsProcessorService
  ) {
    this.adminEventsProcessorService.setUpProcessors();
  }
}
