import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LeaveFeedbackButtonComponent } from '../leave-feedback-button/leave-feedback-button.component';

import { CreateFeedbackDialogService } from '../../../core/services/create-feedback-dialog.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LeaveFeedbackButtonComponent],
})
export class FooterComponent {
  constructor(
    private readonly createFeedbackDialogService: CreateFeedbackDialogService
  ) {}

  protected handleLeaveFeedbackButtonClick(): void {
    this.createFeedbackDialogService.openDialog();
  }
}
