import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { HelpOfferPublicPreviewType } from '../../shared/types/help-offer-public-preview.type';

@Component({
  selector: 'app-public-help-offer-card',
  templateUrl: './public-help-offer-card.component.html',
  styleUrls: ['./public-help-offer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicHelpOfferCardComponent {
  @Input()
  set preview(value: HelpOfferPublicPreviewType | undefined) {
    if (value !== undefined) {
      this._preview = value;
    }
  }

  protected _preview?: HelpOfferPublicPreviewType;
}
