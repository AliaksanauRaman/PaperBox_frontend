import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-white-square-button',
  templateUrl: './white-square-button.component.html',
  styleUrls: ['./white-square-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatRippleModule, MatTooltipModule],
})
/**
 * @deprecated Use {SquareRoundedButtonComponent} instead
 */
export class WhiteSquareButtonComponent {
  @Input()
  public set title(value: string) {
    this._title = value;
  }

  @Input()
  public set tooltip(value: string) {
    this._tooltip = value;
  }

  public _title = '';
  public _tooltip = '';
}
