import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VisibilityToggleComponent } from '../visibility-toggle/visibility-toggle.component';
import { InputControlComponent } from './input-control.component';

@NgModule({
  imports: [CommonModule, VisibilityToggleComponent],
  declarations: [InputControlComponent],
  exports: [InputControlComponent],
})
export class InputControlModule {}
