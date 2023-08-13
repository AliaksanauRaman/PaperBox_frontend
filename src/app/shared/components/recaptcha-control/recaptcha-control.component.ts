import {
  Component,
  forwardRef,
  ChangeDetectionStrategy,
  ViewChild,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  RecaptchaModule,
  RecaptchaFormsModule,
  RecaptchaComponent,
} from 'ng-recaptcha';

import { RECAPTCHA_CONFIG } from '../../../core/dependencies/recaptcha-config';

@Component({
  selector: 'app-recaptcha-control',
  templateUrl: './recaptcha-control.component.html',
  styleUrls: ['./recaptcha-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RecaptchaControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RecaptchaModule, RecaptchaFormsModule],
})
export class RecaptchaControlComponent implements ControlValueAccessor {
  @ViewChild(RecaptchaComponent)
  private readonly _recaptchaComponent!: RecaptchaComponent;

  protected readonly _recaptchaConfig = inject(RECAPTCHA_CONFIG);

  protected _touched = false;
  private _lastResolved = '';

  public writeValue(value: unknown): void {
    if (value !== '') {
      throw new Error(
        'Only an empty string is allowed as an initial value of recaptcha!'
      );
    }

    if (this._lastResolved !== '') {
      this._recaptchaComponent.reset();
      this._lastResolved = '';
    }
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  protected handleResolved(resolvedValue: string): void {
    this._lastResolved = resolvedValue;
    this.onChange(resolvedValue);

    if (!this._touched) {
      this.onTouch();
      this._touched = true;
    }
  }

  private onChange = (value: string) => {};
  private onTouch = () => {};
}
