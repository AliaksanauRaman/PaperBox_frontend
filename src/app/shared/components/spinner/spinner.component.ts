import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type SpinnerColor = 'primary' | 'white';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @Input()
  public set color(value: SpinnerColor) {
    this._color = value;
  }

  public _color: SpinnerColor = 'primary';
}
