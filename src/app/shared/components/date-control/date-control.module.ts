import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateControlComponent } from './date-control.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DateControlComponent,
  ],
  exports: [
    DateControlComponent,
  ],
})
export class DateControlModule {}
