import { Directive, inject, Input, signal } from '@angular/core';
import { z } from 'zod';

import { IdGeneratorService } from '@shared/services/id-generator.service';

import { BaseReactiveField } from './base-reactive-field.directive';

@Directive()
export abstract class BaseTextField extends BaseReactiveField<string> {
  private readonly _idGenerator = inject(IdGeneratorService);

  @Input()
  public set uniqueId(value: string) {
    this._uniqueId.set(value);
  }

  @Input()
  public set label(value: string) {
    this._label.set(value);
  }

  @Input()
  public set placeholder(value: string) {
    this._placeholder.set(value);
  }

  @Input()
  public set maxLength(value: number) {
    this._maxLength.set(value);
  }

  protected readonly _uniqueId = signal(this.getDefaultUniqueId());
  protected readonly _label = signal(this.getDefaultLabel());
  protected readonly _placeholder = signal(this.getDefaultPlaceholder());
  protected readonly _maxLength = signal(this.getDefaultMaxLength());

  public override writeValue(value: unknown): void {
    this._value.set(z.string().parse(value));
  }

  protected override getDefaultValue(): string {
    return '';
  }

  protected getDefaultUniqueId(): string {
    return this._idGenerator.generateUUID();
  }

  protected getDefaultLabel(): string {
    return '';
  }

  protected getDefaultPlaceholder(): string {
    return '';
  }

  protected getDefaultMaxLength(): number {
    return 30;
  }

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
