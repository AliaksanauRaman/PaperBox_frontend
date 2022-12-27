import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminLoginCardComponent } from './components/admin-login-card/admin-login-card.component';

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
    AdminLoginCardComponent
  ],
  exports: [],
})
export class AdminModule {}
