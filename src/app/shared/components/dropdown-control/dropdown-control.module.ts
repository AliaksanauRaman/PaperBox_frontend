import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { DropdownControlComponent } from './dropdown-control.component';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [DropdownControlComponent],
  providers: [],
  exports: [DropdownControlComponent],
})
export class DropdownControlModule {}
