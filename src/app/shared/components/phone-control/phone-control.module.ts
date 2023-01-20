import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneControlComponent } from './phone-control.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PhoneControlComponent],
  providers: [],
  exports: [PhoneControlComponent],
})
export class PhoneControlModule {}
