import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import { AutocompleteControlComponent } from './autocomplete-control.component';
import { DestructureLocationLabelPipe } from './destructure-location-label.pipe';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    MatRippleModule,
    MatTooltipModule,
    TranslateModule,
  ],
  declarations: [AutocompleteControlComponent, DestructureLocationLabelPipe],
  providers: [],
  exports: [AutocompleteControlComponent],
})
export class AutocompleteControlModule {}
