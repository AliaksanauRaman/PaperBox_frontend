import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HttpErrorResponseCardModule } from './../shared/components/http-error-response-card/http-error-response-card.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminLoginCardComponent } from './components/admin-login-card/admin-login-card.component';
import { AdminHelpOffersPageComponent } from './pages/admin-help-offers-page/admin-help-offers-page.component';
import { AdminWorkPageLayoutComponent } from './layouts/admin-work-page-layout/admin-work-page-layout.component';
import { AdminWorkPageToolbarComponent } from './components/admin-work-page-toolbar/admin-work-page-toolbar.component';
import { AdminHelpOffersGridComponent } from './components/admin-help-offers-grid/admin-help-offers-grid.component';
import { AdminHelpOfferCardComponent } from './components/admin-help-offer-card/admin-help-offer-card.component';

import { AdminHelpOffersHttpService } from './services/admin-help-offers-http.service';
import { AdminHelpOffersService } from './services/admin-help-offers.service';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpErrorResponseCardModule,
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
  ],
  providers: [
    AdminHelpOffersHttpService,
    AdminHelpOffersService,
  ],
  exports: [],
})
export class AdminModule {}
