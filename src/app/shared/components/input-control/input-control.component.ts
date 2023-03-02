import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  ChangeDetectorRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { UniqueIdGeneratorService } from '../../../core/services/unique-id-generator.service';

import { CustomControl } from '../../abstracts/custom-control.class';

type InputType = 'text' | 'email';
type InputMode = 'text' | 'email';

const DEFAULT_INPUT_TYPE: InputType = 'text';
const DEFAULT_INPUT_MODE: InputMode = 'text';
const DEFAULT_MAX_CHARACTERS_AMOUNT = 35;

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputControlComponent extends CustomControl<string> {
  @Input()
  public set label(value: string) {
    this.controlLabel = value;
  }

  @Input()
  public set type(value: InputType) {
    this._inputType = value;
  }

  @Input()
  public set mode(value: InputMode) {
    this._inputMode = value;
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
  public set maxCharactersAmount(value: number) {
    this.controlMaxCharactersAmount = value;
  }

  public _inputType: InputType = DEFAULT_INPUT_TYPE;
  public _inputMode: InputMode = DEFAULT_INPUT_MODE;
  protected controlValue = '';
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

  public handleInputValueChange(newValue: string): void {
    this.controlValue = newValue;
    this.onChange(this.controlValue);
  }

  public handleInputFocus(): void {
    this.markControlAsFocused();
  }

  public handleInputBlur(): void {
    this.handleControlBlur();
    this.markControlAsUnfocused();
  }

  // TODO: Move to a shared place
  private isStringOrNull(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
  }
}
