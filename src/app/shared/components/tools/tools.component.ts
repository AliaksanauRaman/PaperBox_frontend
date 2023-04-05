import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { AboutButtonComponent } from '../about-button/about-button.component';
import { AccountButtonComponent } from '../account-button/account-button.component';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { AccountMenuComponent } from '../account-menu/account-menu.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    RouterLinkActive,
    MatMenuModule,
    LanguageSwitcherComponent,
    AboutButtonComponent,
    AccountButtonComponent,
    LoginButtonComponent,
    AccountMenuComponent,
  ],
})
export class ToolsComponent {
  @Input()
  public set isCompact(value: boolean) {
    this._isCompact = value;
  }

  @Input()
  public set isUserLoggedIn(value: boolean) {
    this._isUserLoggedIn = value;
  }

  protected _isCompact = false;
  protected _isUserLoggedIn = false;

  public handleAboutButtonClick(): void {
    // TODO: !IMPORTANT
  }
}
