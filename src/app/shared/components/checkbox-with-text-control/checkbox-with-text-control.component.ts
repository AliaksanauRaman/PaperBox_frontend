import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  OnInit,
  Input,
  forwardRef,
} from '@angular/core';
import { takeUntil, tap } from 'rxjs';

import { CheckboxControlComponent } from '../checkbox-control/checkbox-control.component';

import { UniqueIdGeneratorService } from '../../../core/services/unique-id-generator.service';

import { CustomControl } from '../../abstracts/custom-control.class';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-checkbox-with-text-control',
  templateUrl: './checkbox-with-text-control.component.html',
  styleUrls: ['./checkbox-with-text-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxWithTextControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, CheckboxControlComponent],
})
export class CheckboxWithTextControlComponent
  extends CustomControl<boolean>
  implements OnInit
{
  @Input()
  public set text(value: string) {
    this._text = value;
  }

  @Input()
  public set required(value: boolean) {
    this.controlRequired = value;
  }

  @Input()
  public set centeredText(value: boolean) {
    this._centeredText = value;
  }

  public readonly checkboxControl = this.formBuilder.control(false);

  public _text = '';
  public _textHovered = false;
  protected _centeredText = false;
  private _touched = false;

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef,
    private readonly formBuilder: NonNullableFormBuilder
  ) {
    super(uniqueIdGeneratorService, cdRef);
  }

  public writeValue(value: unknown): void {
    if (value !== null && typeof value !== 'boolean') {
      throw new Error('Only null and boolean values are allowed!');
    }

    this.checkboxControl.setValue(value ?? false, { emitEvent: false });
  }

  public ngOnInit(): void {
    this.checkboxControl.valueChanges
      .pipe(
        tap((checked) => this.handleCheckboxValueChange(checked)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public handleTextClick(): void {
    this.checkboxControl.setValue(!this.checkboxControl.getRawValue());
  }

  public handleTextMouseenter(): void {
    this._textHovered = true;
  }

  public handleTextMouseleave(): void {
    this._textHovered = false;
  }

  public override setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.checkboxControl.disable();
    } else {
      this.checkboxControl.enable();
    }

    super.setDisabledState(isDisabled);
  }

  private handleCheckboxValueChange(newValue: boolean): void {
    this.onChange(newValue);

    if (!this._touched) {
      this.onTouch();
      this._touched = true;
    }
  }
}
