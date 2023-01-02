import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { HelpOfferFullPreviewType } from '../../../shared/types/help-offer-full-preview.type';

@Component({
  selector: 'app-admin-help-offers-grid',
  templateUrl: './admin-help-offers-grid.component.html',
  styleUrls: ['./admin-help-offers-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHelpOffersGridComponent {
  @Input()
  set fullPreviewsOfAllHelpOffers(value: ReadonlyArray<HelpOfferFullPreviewType>) {
    // TODO: More strict types check?
    if (!Array.isArray(value)) {
      throw new Error('Only arrays are allowed here!');
    }

    this._fullPreviewsOfAllHelpOffers = value;
  }

  protected _fullPreviewsOfAllHelpOffers: Array<HelpOfferFullPreviewType> = [];
}
