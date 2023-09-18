import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  Input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { z } from 'zod';

import { CheckboxComponent } from '../checkbox/checkbox.component';

import { IdGeneratorService } from '@shared/services/id-generator.service';

@Component({
  selector: 'pu-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CheckboxComponent],
})
export class CheckboxFieldComponent implements ControlValueAccessor {
  private readonly _idGenerator = inject(IdGeneratorService);

  @Input()
  public set id(value: string) {
    this._id.set(value);
  }

  @Input({ required: true })
  public set text(value: string) {
    this._text.set(value);
  }

  protected readonly _id = signal(this._idGenerator.generateUUID());
  protected readonly _text = signal('');
  protected readonly _isDisabled = signal(false);
  protected readonly _value = signal(false);

  public writeValue(value: unknown): void {
    this._value.set(z.boolean().parse(value));
  }

  public registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }

  protected onChange(value: boolean): void {}
  protected onTouched(): void {}

  protected handleCheckboxClick(): void {
    this.toggleValue();
    this.emitValueChange();
  }

  private toggleValue(): void {
    this._value.update((prevValue) => !prevValue);
  }

  private emitValueChange(): void {
    this.onChange(this._value());
  }
}
