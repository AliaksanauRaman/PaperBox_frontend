import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ScreenSizeObserverService } from '../../services/screen-size-observer.service';
import { CreateFeedbackDialogService } from '../../services/create-feedback-dialog.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  protected _isMenuOpened = false;
  protected readonly _isMobileOrTablet$ =
    this.screenSizeObserverService.isMobileOrTablet$;

  constructor(
    private readonly screenSizeObserverService: ScreenSizeObserverService,
    private readonly createFeedbackDialogService: CreateFeedbackDialogService
  ) {}

  protected handleLeaveFeedbackButtonClick(): void {
    this.createFeedbackDialogService.openDialog();
  }

  protected handleMenuButtonClick(): void {
    this._isMenuOpened = !this._isMenuOpened;
  }
}
