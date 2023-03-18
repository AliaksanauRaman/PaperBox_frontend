import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MenuButtonComponent {
  @Input()
  public set isMenuOpened(value: boolean) {
    this._isMenuOpened = value;
  }

  public _isMenuOpened = false;
}
