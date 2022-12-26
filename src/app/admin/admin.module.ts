import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminMainPageComponent,
    AdminLoginPageComponent
  ],
  exports: [],
})
export class AdminModule {}
