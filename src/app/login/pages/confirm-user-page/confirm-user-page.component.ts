import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';

import { TypeAssertionService } from '../../../core/services/type-assertion.service';

import { ConfirmUserResponseDataType } from '../../../shared/types/confirm-user-response-data.type';

@Component({
  selector: 'app-confirm-user-page',
  templateUrl: './confirm-user-page.component.html',
  styleUrls: ['./confirm-user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmUserPageComponent {
  protected readonly _userConfirmationState$ = this._activatedRoute.data.pipe(
    filter(this.isResolvedUserConfirmation.bind(this)),
    map(({ userConfirmationState }) => userConfirmationState)
  );

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _typeAssertionService: TypeAssertionService
  ) {}

  private isResolvedUserConfirmation(
    value: unknown
  ): value is { userConfirmationState: ConfirmUserResponseDataType } {
    if (
      this._typeAssertionService.isObject(value) &&
      this._typeAssertionService.isObject(value['userConfirmationState']) &&
      typeof value['userConfirmationState']['ok'] === 'boolean'
    ) {
      return true;
    }

    throw new Error('Resolved user confirmation has wrong shape!');
  }
}
