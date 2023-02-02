import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatRippleModule } from '@angular/material/core';

import { DropdownControlComponent } from './dropdown-control.component';

@NgModule({
  imports: [CommonModule, OverlayModule, MatRippleModule],
  declarations: [DropdownControlComponent],
  providers: [],
  exports: [DropdownControlComponent],
})
export class DropdownControlModule {}
