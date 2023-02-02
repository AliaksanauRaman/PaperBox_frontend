import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutocompleteControlComponent } from './autocomplete-control.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AutocompleteControlComponent],
  providers: [],
  exports: [AutocompleteControlComponent],
})
export class AutocompleteControlModule {}
