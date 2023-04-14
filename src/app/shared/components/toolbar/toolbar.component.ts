import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ToolsComponent } from '../tools/tools.component';
import { MenuButtonComponent } from '../menu-button/menu-button.component';

import { ScreenSizeObserverService } from '../../../core/services/screen-size-observer.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink, ToolsComponent, MenuButtonComponent],
})
export class ToolbarComponent {
  @Input()
  public set userIsLoggedIn(value: boolean) {
    this._userIsLoggedIn = value;
  }

  protected _userIsLoggedIn = false;
  protected _isMenuOpened = false;
  protected readonly _isMobileOrTablet$ =
    this._screenSizeObserverService.isMobileOrTablet$;

  constructor(
    private readonly _screenSizeObserverService: ScreenSizeObserverService
  ) {}

  protected handleMenuButtonClick(): void {
    this._isMenuOpened = !this._isMenuOpened;
  }
}
