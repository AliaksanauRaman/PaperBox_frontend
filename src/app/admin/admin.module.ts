import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { HttpErrorResponseCardModule } from '../shared/components/http-error-response-card/http-error-response-card.module';
import { HttpErrorMessagePipeModule } from '../shared/pipes/http-error-message/http-error-message-pipe.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminLoginCardComponent } from './components/admin-login-card/admin-login-card.component';
import { AdminHelpOffersPageComponent } from './pages/admin-help-offers-page/admin-help-offers-page.component';
import { AdminWorkPageLayoutComponent } from './layouts/admin-work-page-layout/admin-work-page-layout.component';
import { AdminWorkPageToolbarComponent } from './components/admin-work-page-toolbar/admin-work-page-toolbar.component';
import { AdminHelpOffersGridComponent } from './components/admin-help-offers-grid/admin-help-offers-grid.component';
import { AdminHelpOfferCardComponent } from './components/admin-help-offer-card/admin-help-offer-card.component';
import { AdminHelpOfferStatusComponent } from './components/admin-help-offer-status/admin-help-offer-status.component';
import { AdminHelpOfferDetailsComponent } from './components/admin-help-offer-details/admin-help-offer-details.component';
import { AdminManageHelpOfferDialogComponent } from './dialogs/admin-manage-help-offer-dialog/admin-manage-help-offer-dialog.component';

import { AdminHelpOffersHttpService } from './services/admin-help-offers-http.service';
import { AdminHelpOffersService } from './services/admin-help-offers.service';
import { AdminEventsProcessorService } from './services/admin-events-processor.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    HttpErrorResponseCardModule,
    HttpErrorMessagePipeModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminLoginPageComponent,
    AdminLoginCardComponent,
    AdminHelpOffersPageComponent,
    AdminWorkPageLayoutComponent,
    AdminWorkPageToolbarComponent,
    AdminHelpOffersGridComponent,
    AdminHelpOfferCardComponent,
    AdminHelpOfferStatusComponent,
    AdminHelpOfferDetailsComponent,
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
  constructor(
    private readonly adminEventsProcessorService: AdminEventsProcessorService
  ) {
    this.adminEventsProcessorService.setUpProcessors();
  }
}
