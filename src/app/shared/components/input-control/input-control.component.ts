import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputControlComponent {
  @Input()
  public set label(value: string) {
    this._label = value;
  }

  protected _label = '';
  protected readonly controlId = Math.random().toString().slice(2);
}
