import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { SpinnerModule } from '../spinner/spinner.module';

type PrimaryButtonType = 'submit' | 'button';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, SpinnerModule],
})
export class PrimaryButtonComponent {
  @Input()
  public set type(value: PrimaryButtonType) {
    this._type = value;
  }

  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  @Input()
  public set isLoadingState(value: boolean) {
    this._isLoadingState = value;
  }

  protected _type: PrimaryButtonType = 'submit';
  protected _disabled = false;
  protected _isLoadingState = false;
}
