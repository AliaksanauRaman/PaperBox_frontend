import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { UniqueIdGeneratorService } from '../../../services/unique-id-generator.service';

import { CustomControl } from '../../abstracts/custom-control.class';

const DEFAULT_MAX_CHARACTERS_AMOUNT = 255;

@Component({
  selector: 'app-textarea-field-control',
  templateUrl: './textarea-field-control.component.html',
  styleUrls: ['./textarea-field-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaFieldControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaFieldControlComponent extends CustomControl<string> {
  @Input()
  public set label(value: string) {
    this.controlLabel = value;
  }

  @Input()
  public set required(value: boolean) {
    this.controlRequired = value;
  }

  @Input()
  public set placeholder(value: string) {
    this.controlPlaceholder = value;
  }

  @Input()
  public set warningColored(value: boolean) {
    this.controlWarningColored = value;
  }

  @Input()
  public set maxCharactersAmount(value: number) {
    this.controlMaxCharactersAmount = value;
  }

  protected controlValue = '';
  protected controlWarningColored = false;
  protected controlMaxCharactersAmount = DEFAULT_MAX_CHARACTERS_AMOUNT;

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef
  ) {
    super(uniqueIdGeneratorService, cdRef);
  }

  public writeValue(value: unknown): void {
    if (!this.isStringOrNull(value)) {
      throw new Error('Only strings and null are allowed!');
    }

    this.controlValue = value === null ? '' : value;
    this.cdRef.markForCheck();
  }

  public handleTextareaValueChange(newValue: string): void {
    this.controlValue = newValue;
    this.onChange(this.controlValue);
  }

  public handleTextareaFocus(): void {
    this.markControlAsFocused();
  }

  public handleTextareaBlur(): void {
    this.handleControlBlur();
    this.markControlAsUnfocused();
  }

  // TODO: Move to a shared place
  private isStringOrNull(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
  }
}
