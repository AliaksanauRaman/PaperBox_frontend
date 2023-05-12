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
import { LocationLabelPipe } from '../shared/pipes/location-label.pipe';
import { DatesPipe } from './../shared/pipes/dates.pipe';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminFeedbacksPageComponent } from './pages/admin-feedbacks-page/admin-feedbacks-page.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminHelpRequestsPageComponent } from './pages/admin-help-requests-page/admin-help-requests-page.component';
import { AdminUsersPageComponent } from './pages/admin-users-page/admin-users-page.component';
import { AdminSettingsPageComponent } from './pages/admin-settings-page/admin-settings-page.component';
import { AdminLoginCardComponent } from './components/admin-login-card/admin-login-card.component';
import { AdminHelpOffersPageComponent } from './pages/admin-help-offers-page/admin-help-offers-page.component';
import { AdminWorkPageLayoutComponent } from './layouts/admin-work-page-layout/admin-work-page-layout.component';
import { AdminFullApplicationsTableComponent } from './components/admin-full-applications-table/admin-full-applications-table.component';

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
    LocationLabelPipe,
    DatesPipe,
    AdminRoutingModule,
  ],
  declarations: [
    AdminFeedbacksPageComponent,
    AdminLoginPageComponent,
    AdminLoginCardComponent,
    AdminHelpOffersPageComponent,
    AdminHelpRequestsPageComponent,
    AdminUsersPageComponent,
    AdminSettingsPageComponent,
    AdminWorkPageLayoutComponent,
    AdminFullApplicationsTableComponent,
  ],
  providers: [],
  exports: [],
})
export class AdminModule {}
