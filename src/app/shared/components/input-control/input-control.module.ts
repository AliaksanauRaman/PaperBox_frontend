import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InputControlComponent } from './input-control.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    InputControlComponent,
  ],
  exports: [
    InputControlComponent,
  ],
})
export class InputControlModule {}
