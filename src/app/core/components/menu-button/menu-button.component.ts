import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuButtonComponent {
  @Input()
  public set isMenuOpened(value: boolean) {
    this._isMenuOpened = value;
  }

  public _isMenuOpened = false;
}
