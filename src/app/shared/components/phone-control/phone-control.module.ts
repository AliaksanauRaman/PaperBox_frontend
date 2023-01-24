import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownControlModule } from '../dropdown-control/dropdown-control.module';

import { PhoneControlComponent } from './phone-control.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    DropdownControlModule,
  ],
  declarations: [PhoneControlComponent],
  providers: [],
  exports: [PhoneControlComponent],
})
export class PhoneControlModule {}
