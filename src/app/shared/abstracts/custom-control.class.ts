import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { UniqueIdGeneratorService } from '../../services/unique-id-generator.service';

export abstract class CustomControl<T = unknown> implements ControlValueAccessor {
  protected abstract controlValue: T;
  protected controlLabel = '';
  protected controlDisabled = false;

  protected readonly controlId = this.uniqueIdGeneratorService.generate();

  constructor(
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
    protected readonly cdRef: ChangeDetectorRef,
  ) {}

  public abstract writeValue(value: unknown): void;

  public registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.controlDisabled = isDisabled;
    this.cdRef.markForCheck();
  }

  public handleControlBlur(): void {
    this.onTouch();
  }

  protected onChange = (value: T) => {};
  protected onTouch = () => {};
}
