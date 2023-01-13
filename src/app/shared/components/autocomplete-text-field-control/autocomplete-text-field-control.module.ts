import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AutocompleteTextFieldControlComponent } from './autocomplete-text-field-control.component';

@NgModule({
  imports: [CommonModule, MatAutocompleteModule],
  declarations: [AutocompleteTextFieldControlComponent],
  providers: [],
  exports: [AutocompleteTextFieldControlComponent],
})
export class AutocompleteTextFieldControlModule {}
