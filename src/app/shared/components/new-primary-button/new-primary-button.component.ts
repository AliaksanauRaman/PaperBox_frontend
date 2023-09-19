import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  signal,
} from '@angular/core';

type PrimaryButtonType = 'button' | 'submit';

@Component({
  selector: '[puNewPrimaryButton]',
  templateUrl: './new-primary-button.component.html',
  styleUrls: ['./new-primary-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NewPrimaryButtonComponent {
  @HostBinding('attr.type')
  public get buttonType(): PrimaryButtonType {
    return this._type();
  }

  @Input()
  public set type(value: PrimaryButtonType) {
    this._type.set(value);
  }

  private readonly _type = signal<PrimaryButtonType>('button');
}
