import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { UniqueIdGeneratorService } from '../../services/unique-id-generator.service';

import { DestroyEmitter } from './destroy-emitter.class';

export abstract class CustomControl<T = unknown> extends DestroyEmitter implements ControlValueAccessor {
  public get controlFocused(): boolean {
    return this.isFocused;
  }

  protected controlLabel = '';
  protected controlPlaceholder = '';
  protected controlDisabled = false;
  protected controlRequired = false;

  protected readonly controlId = this.uniqueIdGeneratorService.generate();

  private isFocused = false;

  constructor(
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
    protected readonly cdRef: ChangeDetectorRef,
  ) {
    super();
  }

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

  protected markControlAsFocused(): void {
    this.isFocused = true;
  }

  protected markControlAsUnfocused(): void {
    this.isFocused = false;
  }

  protected onChange = (value: T) => {};
  protected onTouch = () => {};
}
