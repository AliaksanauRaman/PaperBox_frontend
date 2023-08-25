import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { tap } from 'rxjs';

import { LoadingOverlayService } from './core/services/loading-overlay.service';
import { KeyboardService } from './core/services/keyboard.service';
import { CommandsPanelService } from './core/commands/commands-panel.service';
import { UserTokenIssuesNotifierService } from './shared/services/user-token-issues-notifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _loadingOverlayService: LoadingOverlayService,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _keyboardService: KeyboardService,
    private readonly _commandsPanelService: CommandsPanelService,
    private readonly _userTokenIssuesNotifierService: UserTokenIssuesNotifierService
  ) {}

  public ngOnInit(): void {
    this._loadingOverlayService.setViewContainerRef(this._viewContainerRef);
    this._userTokenIssuesNotifierService.startWatching();
    this.setUpListenerForCommandsPanel();
  }

  private setUpListenerForCommandsPanel(): void {
    this._keyboardService
      .onKeyup(KeyboardService.KeyCode.F8)
      .pipe(tap(() => this._commandsPanelService.show()))
      .subscribe();
  }
}
