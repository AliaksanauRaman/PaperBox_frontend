import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminLoginCardComponent } from './components/admin-login-card/admin-login-card.component';
import { AdminHelpOffersPageComponent } from './pages/admin-help-offers-page/admin-help-offers-page.component';
import { AdminWorkPageLayoutComponent } from './layouts/admin-work-page-layout/admin-work-page-layout.component';
import { AdminWorkPageHeaderComponent } from './components/admin-work-page-header/admin-work-page-header.component';

import { AdminHelpOffersHttpService } from './services/admin-help-offers-http.service';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminMainPageComponent,
    AdminLoginPageComponent,
    AdminLoginCardComponent,
    AdminHelpOffersPageComponent,
    AdminWorkPageLayoutComponent,
    AdminWorkPageHeaderComponent
  ],
  providers: [
    AdminHelpOffersHttpService,
  ],
  exports: [],
})
export class AdminModule {}
