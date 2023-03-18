import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CreateFeedbackDialogService } from '../../services/create-feedback-dialog.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolsComponent {
  @Input()
  public set isCompact(value: boolean) {
    this._isCompact = value;
  }

  @Input()
  public set isUserLoggedIn(value: boolean) {
    this._isUserLoggedIn = value;
  }

  protected _isCompact = false;
  protected _isUserLoggedIn = false;

  constructor(
    private readonly createFeedbackDialogService: CreateFeedbackDialogService
  ) {}

  public handleLeaveFeedbackButtonClick(): void {
    this.createFeedbackDialogService.openDialog();
  }
}
