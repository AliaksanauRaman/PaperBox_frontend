import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type ArrowDownIconColor = 'grey' | 'primary';

@Component({
  selector: 'app-arrow-down-icon',
  templateUrl: './arrow-down-icon.component.html',
  styleUrls: ['./arrow-down-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrowDownIconComponent {
  @Input()
  public set color(value: ArrowDownIconColor) {
    this._color = value;
  }

  protected _color: ArrowDownIconColor = 'grey';
}
