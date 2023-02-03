import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { UniqueIdGeneratorService } from '../../../services/unique-id-generator.service';

import { CustomControl } from '../../abstracts/custom-control.class';
import { DataSource } from '../../classes/data-source.class';
import { DataSourceOption } from '../../classes/data-source-option.class';

@Component({
  selector: 'app-dropdown-control',
  templateUrl: './dropdown-control.component.html',
  styleUrls: ['./dropdown-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// TODO: Probably it is better to make it not reusable
export class DropdownControlComponent extends CustomControl<string> {
  @Input()
  public set dataSource(value: DataSource<string>) {
    this.controlDataSource = value;
  }

  @Input()
  public set placeholder(value: string) {
    this.controlPlaceholder = value;
  }

  @Input()
  public set required(value: boolean) {
    this.controlRequired = value;
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public get controlValue(): string {
    return this._controlValue;
  }

  @Output()
  public readonly optionClick = new EventEmitter<void>();

  @Output()
  public readonly focus = new EventEmitter<void>();

  @Output()
  public readonly blur = new EventEmitter<void>();

  protected controlDataSource = DataSource.createEmpty<string>();

  private _isOpen = false;
  private _controlValue = '';

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef
  ) {
    super(uniqueIdGeneratorService, cdRef);
  }

  public writeValue(value: string | null): void {
    // TODO: Assert value type

    if (value === '' || value === null) {
      this._controlValue = '';
      return;
    }

    const optionsValues = this.controlDataSource.getOptionsValues();

    if (!optionsValues.includes(value)) {
      throw new Error(`Data source does not have '${value}' value!`);
    }

    this._controlValue = value;
  }

  public handleFieldClick(): void {
    this.focus.emit();
    this.openPanel();
  }

  public handleFieldFocus(): void {
    this.focus.emit();
    this.openPanel();
  }

  public handleFieldBlur(): void {
    setTimeout(() => {
      this.closePanel();
      this.cdRef.markForCheck();
    }, 0);
  }

  public handleBackdropClick(): void {
    this.closePanel();
    this.blur.emit();
    this.handleControlBlur();
  }

  protected toggleIsOpenState(): void {
    if (this._isOpen) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  protected openPanel(): void {
    this._isOpen = true;
  }

  protected closePanel(): void {
    this._isOpen = false;
  }

  protected handleOptionClick(option: DataSourceOption<string>): void {
    if (this._controlValue !== option.value) {
      this._controlValue = option.value;
      this.onChange(this._controlValue);
    }

    this.closePanel();
    this.optionClick.emit();
    this.blur.emit();
    this.handleControlBlur();
  }
}
