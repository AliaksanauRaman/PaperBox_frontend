import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LeaveFeedbackButtonComponent } from '../leave-feedback-button/leave-feedback-button.component';

import { CreateFeedbackDialogService } from '../../../core/services/create-feedback-dialog.service';
import { UserStateService } from '../../../state/user/user-state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LeaveFeedbackButtonComponent],
})
export class FooterComponent {
  private readonly _userStateService = inject(UserStateService);
  private readonly _createFeedbackDialogService = inject(
    CreateFeedbackDialogService
  );

  protected handleLeaveFeedbackButtonClick(): void {
    this._createFeedbackDialogService.openDialog(
      this._userStateService.get()?.email
    );
  }
}
