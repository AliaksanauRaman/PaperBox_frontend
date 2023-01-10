import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextareaFieldControlComponent } from './textarea-field-control.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TextareaFieldControlComponent],
  providers: [],
  exports: [TextareaFieldControlComponent],
})
export class TextareaFieldControlModule {}
