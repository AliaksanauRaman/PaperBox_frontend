import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { ActiveViewService } from '../../services/active-view.service';

import { ACTIONS, ACTIONS_VALUE, Actions } from './actions.config';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  providers: [
    {
      provide: ACTIONS,
      useValue: ACTIONS_VALUE,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  public readonly activeView$ = this.activeViewService.activeView$;

  constructor(
    @Inject(ACTIONS)
    public readonly actions: Actions,
    private readonly activeViewService: ActiveViewService
  ) {}
}
