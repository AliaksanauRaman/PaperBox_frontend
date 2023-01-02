import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { HttpErrorResponseCardComponent } from './http-error-response-card.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatIconModule,
  ],
  declarations: [
    HttpErrorResponseCardComponent,
  ],
  exports: [
    HttpErrorResponseCardComponent,
  ],
})
export class HttpErrorResponseCardModule {}
