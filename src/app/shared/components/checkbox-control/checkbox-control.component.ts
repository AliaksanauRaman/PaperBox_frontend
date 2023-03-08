import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { UniqueIdGeneratorService } from '../../../core/services/unique-id-generator.service';

import { CustomControl } from '../../abstracts/custom-control.class';

@Component({
  selector: 'app-checkbox-control',
  templateUrl: './checkbox-control.component.html',
  styleUrls: ['./checkbox-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class CheckboxControlComponent extends CustomControl<boolean> {
  @Input()
  public set hovered(value: boolean) {
    this._hovered = value;
  }

  public _checked = false;
  public _hovered = false;
  private _touched = false;

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef
  ) {
    super(uniqueIdGeneratorService, cdRef);
  }

  public writeValue(value: unknown): void {
    if (value !== null && typeof value !== 'boolean') {
      throw new Error('Only null and boolean values are allowed!');
    }

    this._checked = value ?? false;
    this.cdRef.markForCheck();
  }

  public handleCheckboxClick(): void {
    this.toggleCheckedState();
    this.onChange(this._checked);

    if (!this._touched) {
      this.onTouch();
      this._touched = true;
    }
  }

  public handleCheckboxMouseenter(): void {
    this._hovered = true;
  }

  public handleCheckboxMouseleave(): void {
    this._hovered = false;
  }

  private toggleCheckedState(): void {
    this._checked = !this._checked;
  }
}
