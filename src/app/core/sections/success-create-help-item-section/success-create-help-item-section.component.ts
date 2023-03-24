import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { InfoNotificationService } from '../../services/info-notification.service';
import { ErrorNotificationService } from '../../services/error-notification.service';

@Component({
  selector: 'app-success-create-help-item-section',
  templateUrl: './success-create-help-item-section.component.html',
  styleUrls: ['./success-create-help-item-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessCreateHelpItemSectionComponent {
  @Input()
  public set helpItemPublicId(value: string) {
    this._helpItemPublicId = value;
  }

  @Output()
  public readonly ok = new EventEmitter<void>();

  protected _helpItemPublicId = '';

  constructor(
    private readonly _clipboard: Clipboard,
    private readonly _infoNotificationService: InfoNotificationService,
    private readonly _errorNotificationService: ErrorNotificationService
  ) {}

  protected handlePublicIdValueClick(publicIdValue: string): void {
    const isSuccessfullyCopied = this._clipboard.copy(publicIdValue);

    if (isSuccessfullyCopied) {
      this._infoNotificationService.showMessage(
        'infos.applicationIdIsSuccessfullyCopied'
      );
    } else {
      this._errorNotificationService.showMessage(
        'errors.applicationIdCopyError'
      );
    }
  }

  protected handleThankYouButtonClick(): void {
    this.ok.emit();
  }
}
