import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

import { CalendarIconModule } from '../../icons/calendar-icon/calendar-icon.module';

import { DateControlComponent } from './date-control.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    CalendarIconModule,
  ],
  declarations: [DateControlComponent],
  exports: [DateControlComponent],
})
export class DateControlModule {}
