import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { HelpOfferStatus } from '../../../shared/enums/help-offer-status.enum';

type StatusSize = 'small' | 'big';

@Component({
  selector: 'app-admin-small-help-offer-status',
  templateUrl: './admin-small-help-offer-status.component.html',
  styleUrls: ['./admin-small-help-offer-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSmallHelpOfferStatusComponent {
  @Input()
  public set status(value: HelpOfferStatus) {
    this._status = value;
  }

  @Input()
  public set size(value: StatusSize) {
    this._size = value;
  }

  protected _status?: HelpOfferStatus;
  protected _size = 'small';
  protected readonly helpOfferStatus = HelpOfferStatus;
}
