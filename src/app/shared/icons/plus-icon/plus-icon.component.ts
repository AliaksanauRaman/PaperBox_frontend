import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type PlusIconColor = 'black' | 'grey';

@Component({
  selector: 'app-plus-icon',
  templateUrl: './plus-icon.component.html',
  styleUrls: ['./plus-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlusIconComponent {
  @Input()
  public set color(value: PlusIconColor) {
    this._color = value;
  }

  protected _color: PlusIconColor = 'black';
}
