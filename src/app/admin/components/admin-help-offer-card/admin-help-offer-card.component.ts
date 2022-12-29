import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { HelpOfferFullPreviewType } from '../../../shared/types/help-offer-full-preview.type';
import { HelpOfferStatus } from '../../../shared/enums/help-offer-status.enum';

@Component({
  selector: 'app-admin-help-offer-card',
  templateUrl: './admin-help-offer-card.component.html',
  styleUrls: ['./admin-help-offer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHelpOfferCardComponent {
  @Input()
  set helpOfferFullPreview(value: HelpOfferFullPreviewType) {
    this._helpOfferFullPreview = value;
  }

  protected _helpOfferFullPreview?: HelpOfferFullPreviewType;
  protected readonly helpOfferStatus = HelpOfferStatus;
}
