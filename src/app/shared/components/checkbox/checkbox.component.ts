import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';

@Component({
  selector: 'pu-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CheckboxComponent {
  @Input()
  public set uniqueId(value: string) {
    this._uniqueId.set(value);
  }

  @Input()
  public set isChecked(value: boolean) {
    this._isChecked.set(value);
  }

  @Output()
  public readonly puClick = new EventEmitter<MouseEvent>();

  @Output()
  public readonly puFocus = new EventEmitter<FocusEvent>();

  protected readonly _uniqueId = signal('');
  protected readonly _isChecked = signal(false);
}
