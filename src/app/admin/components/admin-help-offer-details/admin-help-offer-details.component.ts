import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FullHelpOfferType } from '../../types/full-help-offer.type';

@Component({
  selector: 'app-admin-help-offer-details',
  templateUrl: './admin-help-offer-details.component.html',
  styleUrls: ['./admin-help-offer-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHelpOfferDetailsComponent {
  @Input()
  public set helpOffer(value: FullHelpOfferType) {
    this._helpOffer = value;
  }

  protected _helpOffer?: FullHelpOfferType;
}
