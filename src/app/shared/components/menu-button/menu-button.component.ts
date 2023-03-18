import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';

import { WhiteSquareButtonComponent } from '../white-square-button/white-square-button.component';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, WhiteSquareButtonComponent],
})
export class MenuButtonComponent {
  @Input()
  public set isMenuOpened(value: boolean) {
    this._isMenuOpened = value;
  }

  public _isMenuOpened = false;
}
