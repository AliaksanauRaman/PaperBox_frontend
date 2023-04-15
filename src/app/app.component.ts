import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Inject,
} from '@angular/core';
import { tap } from 'rxjs';

import {
  LOCAL_STORAGE,
  LocalStorageType,
} from './core/dependencies/local-storage';
import { AppLanguagesService } from './core/services/app-languages.service';
import { KeyboardService } from './core/services/keyboard.service';
import { CommandsPanelService } from './core/commands/commands-panel.service';
import { UserTokenIssuesNotifierService } from './shared/services/user-token-issues-notifier.service';
import { UserTokenService } from './shared/services/user-token.service';

import { LocalStorageKey } from './shared/enums/local-storage-key.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(LOCAL_STORAGE) private readonly _localStorage: LocalStorageType,
    private readonly _languagesService: AppLanguagesService,
    private readonly _keyboardService: KeyboardService,
    private readonly _commandsPanelService: CommandsPanelService,
    private readonly _userTokenIssuesNotifierService: UserTokenIssuesNotifierService,
    private readonly _userTokenService: UserTokenService
  ) {}

  public ngOnInit(): void {
    this._userTokenIssuesNotifierService.startWatching();
    this.tryToLoadUserTokenFromLocalStorage();
    this.setUpListenerForCommandsPanel();
    this._languagesService.setUp();
  }

  private tryToLoadUserTokenFromLocalStorage(): void {
    const userToken = this._localStorage.getItem(LocalStorageKey.USER_TOKEN);

    if (userToken === null) {
      return;
    }

    this._userTokenService.setUserToken(userToken);
  }

  private setUpListenerForCommandsPanel(): void {
    this._keyboardService
      .onKeyup(KeyboardService.KeyCode.F8)
      .pipe(tap(() => this._commandsPanelService.show()))
      .subscribe();
  }
}
