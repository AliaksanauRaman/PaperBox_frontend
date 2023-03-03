import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';

import { AppLanguagesService } from './core/services/app-languages.service';
import { KeyboardService } from './core/services/keyboard.service';
import { CommandsPanelService } from './core/commands/commands-panel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly languagesService: AppLanguagesService,
    private readonly keyboardService: KeyboardService,
    private readonly commandsPanelService: CommandsPanelService
  ) {}

  public ngOnInit(): void {
    this.languagesService.setUp();

    this.keyboardService
      .onKeyup(KeyboardService.KeyCode.F8)
      .pipe(tap(() => this.commandsPanelService.show()))
      .subscribe();
  }
}
