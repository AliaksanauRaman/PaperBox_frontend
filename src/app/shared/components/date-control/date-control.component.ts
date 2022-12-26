import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UniqueIdGeneratorService } from './../../../services/unique-id-generator.service';

@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// TODO: Make abstract class
export class DateControlComponent implements ControlValueAccessor {
  @Input()
  set label(value: string) {
    this._label = value;
  }

  protected _label = '';
  protected inputDisabled = false;
  protected inputValue = '';
  protected readonly inputId = this.uniqueIdGeneratorService.generate();

  constructor(
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  public writeValue(value: unknown): void {
    if (!this.isStringOrNull(value)) {
      throw new Error('Only strings and null are allowed!');
    }

    this.inputValue = value === null ? '' : value;
    this.cdRef.markForCheck();
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.registerOnTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.inputDisabled = isDisabled;
    this.cdRef.markForCheck();
  }

  public handleInputValueChange(inputValue: string): void {
    this.inputValue = inputValue;
    this.onChange(this.inputValue);
  }

  public handleInputBlur(): void {
    this.onTouch();
  }

  private onChange = (value: string) => {};
  private onTouch = () => {};

  private isStringOrNull(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
  }
}
