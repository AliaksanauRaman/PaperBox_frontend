import { signal, Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { AutoDestroy } from '@shared/abstracts/auto-destroy.class';

@Directive()
export abstract class BaseReactiveField<T = unknown>
  extends AutoDestroy
  implements ControlValueAccessor
{
  private _fieldValue = this.getDefaultValue();

  // TODO: Remove
  protected readonly _value = signal(this.getDefaultValue());
  protected readonly _isDisabled = signal(false);

  public abstract writeValue(value: unknown): void;

  public registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }

  protected abstract getDefaultValue(): T;
  protected onChange(value: T): void {}
  protected onTouched(): void {}

  protected setFieldValue(value: T): void {
    this._fieldValue = value;
  }

  protected getFieldValue(): T {
    return this._fieldValue;
  }
}
