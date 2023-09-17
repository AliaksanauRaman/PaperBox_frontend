import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import { AutocompleteControlComponent } from './autocomplete-control.component';
import { PlaceListItemComponent } from '../place-list-item/place-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    MatRippleModule,
    MatTooltipModule,
    TranslateModule,
    PlaceListItemComponent,
  ],
  declarations: [AutocompleteControlComponent],
  providers: [],
  exports: [AutocompleteControlComponent],
})
export class AutocompleteControlModule {}
