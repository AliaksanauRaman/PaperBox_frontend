import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LeaveFeedbackButtonComponent } from '../leave-feedback-button/leave-feedback-button.component';

import { CreateFeedbackDialogService } from '../../../core/services/create-feedback-dialog.service';
import { UserService } from '../../services/user.service';

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
    private readonly _createFeedbackDialogService: CreateFeedbackDialogService,
    private readonly _userService: UserService
  ) {}

  protected handleLeaveFeedbackButtonClick(): void {
    const userEmail = this._userService.userIsLoggedIn
      ? this._userService.user?.email
      : undefined;
    this._createFeedbackDialogService.openDialog(userEmail);
  }
}
