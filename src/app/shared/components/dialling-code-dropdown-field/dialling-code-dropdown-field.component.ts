import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  forwardRef,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  CdkListboxModule,
  ListboxValueChangeEvent,
} from '@angular/cdk/listbox';

import { DIALLING_CODES } from './dialling-code-dropdown-field.config';
import { BaseDropdownField } from '@shared/base/base-dropdown-field.directive';
import { DiallingCode } from '@shared/types/dialling-code';

@Component({
  selector: 'pu-dialling-code-dropdown-field',
  templateUrl: './dialling-code-dropdown-field.component.html',
  styleUrls: ['./dialling-code-dropdown-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DiallingCodeDropdownFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, OverlayModule, CdkListboxModule],
})
export class DiallingCodeDropdownFieldComponent
  extends BaseDropdownField
  implements ControlValueAccessor
{
  protected readonly _value = signal<DiallingCode | null>(null);
  protected readonly _idDisabled = signal(false);
  protected readonly _diallingCodes = inject(DIALLING_CODES);

  public writeValue(value: unknown): void {
    if (value !== null && !DiallingCode.is(value)) {
      throw new Error('Only null or DiallingCode values are expected!');
    }

    this._value.set(value);
  }

  public registerOnChange(fn: (value: DiallingCode | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._idDisabled.set(isDisabled);
  }

  protected onChange(value: DiallingCode | null) {}
  protected onTouched() {}

  protected override getDefaultPlaceholder(): string {
    return '+XXX';
  }

  protected handleListboxValueChange(
    event: ListboxValueChangeEvent<unknown>
  ): void {
    const selectedValue = event.value[0];

    if (!DiallingCode.is(selectedValue)) {
      throw new Error('An instance of DiallingCode is expected!');
    }

    if (this.checkIsNewValue(selectedValue)) {
      this._value.set(selectedValue);
      this.onChange(selectedValue);
    }

    this.closePanel();
  }

  private checkIsNewValue(value: DiallingCode | null): boolean {
    const currentValue = this._value();

    if (value !== null && currentValue !== null) {
      return !DiallingCode.equals(value, currentValue);
    }

    return value !== currentValue;
  }
}
