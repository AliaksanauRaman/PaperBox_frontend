import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateControlComponent {
  @Input()
  set label(value: string) {
    this._label = value;
  }

  protected _label = '';
  protected readonly controlId = Math.random().toString().slice(2);
}
