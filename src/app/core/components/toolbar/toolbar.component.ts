import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FeedbackDialogService } from '../../services/feedback-dialog.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  constructor(private readonly feedbackDialogService: FeedbackDialogService) {}

  public handleLeaveFeedbackButtonClick(): void {
    this.feedbackDialogService.openDialog();
  }
}
