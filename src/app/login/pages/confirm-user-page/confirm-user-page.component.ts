import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ConfirmUserPageService } from '../../services/confirm-user-page.service';

@Component({
  selector: 'app-confirm-user-page',
  templateUrl: './confirm-user-page.component.html',
  styleUrls: ['./confirm-user-page.component.scss'],
  providers: [ConfirmUserPageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmUserPageComponent {
  private readonly _confirmUserPageService = inject(ConfirmUserPageService);

  protected readonly userConfirmationState$ =
    this._confirmUserPageService.userConfirmationState$;
}
