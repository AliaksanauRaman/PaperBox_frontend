import { Directive, inject, Input, signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { z } from 'zod';

import { IdGeneratorService } from '@shared/services/id-generator.service';

const DEFAULT_MAX_LENGTH = 30;

@Directive()
export abstract class BaseTextField implements ControlValueAccessor {
  private readonly _idGenerator = inject(IdGeneratorService);

  @Input()
  public set id(value: string) {
    this._id.set(value);
  }

  @Input({ required: true })
  public set label(value: string) {
    this._label.set(value);
  }

  @Input()
  public set placeholder(value: string) {
    this._placeholder.set(value);
  }

  @Input()
  public set isDisabled(value: boolean) {
    this._isDisabled.set(value);
  }

  @Input()
  public set maxLength(value: number) {
    this._maxLength.set(value);
  }

  protected readonly _id = signal(this._idGenerator.generateUUID());
  protected readonly _label = signal('');
  protected readonly _placeholder = signal('');
  protected readonly _isDisabled = signal(false);
  protected readonly _maxLength = signal(DEFAULT_MAX_LENGTH);
  protected readonly _value = signal('');

  public writeValue(value: unknown): void {
    this._value.set(z.string().parse(value));
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }

  protected onChange(value: string): void {}
  protected onTouched(): void {}

  protected handleFieldInput(value: string): void {
    if (!this.checkIsNewValue(value)) {
      return;
    }

    this._value.set(value);
    this.onChange(value);
  }

  private checkIsNewValue(value: string): boolean {
    return this._value() !== value;
  }
}
