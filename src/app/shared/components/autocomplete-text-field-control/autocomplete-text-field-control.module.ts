import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AutocompleteTextFieldControlComponent } from './autocomplete-text-field-control.component';
import { DestructureLocationLabelPipe } from './destructure-location-label.pipe';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule],
  declarations: [
    AutocompleteTextFieldControlComponent,
    DestructureLocationLabelPipe,
  ],
  providers: [],
  exports: [AutocompleteTextFieldControlComponent],
})
export class AutocompleteTextFieldControlModule {}
