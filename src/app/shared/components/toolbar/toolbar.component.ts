import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ToolsComponent } from '../tools/tools.component';
import { MenuButtonComponent } from '../menu-button/menu-button.component';

import { ScreenSizeObserverService } from '../../../core/services/screen-size-observer.service';
import { CreateFeedbackDialogService } from '../../../core/services/create-feedback-dialog.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink, ToolsComponent, MenuButtonComponent],
})
export class ToolbarComponent {
  @Input()
  public set isLoginFlow(value: boolean) {
    this._isLoginFlow = value;
  }

  protected _isLoginFlow = false;
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
