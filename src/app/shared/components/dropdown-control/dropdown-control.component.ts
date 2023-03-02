import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { UniqueIdGeneratorService } from '../../../core/services/unique-id-generator.service';

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

  public get focusableElement(): HTMLDivElement {
    return this.focusableElementRef.nativeElement;
  }

  @Output()
  public readonly optionClick = new EventEmitter<void>();

  @Output()
  public readonly focus = new EventEmitter<void>();

  @Output()
  public readonly blur = new EventEmitter<FocusEvent>();

  @ViewChild('focusableElementRef')
  private readonly focusableElementRef!: ElementRef<HTMLDivElement>;

  protected controlDataSource = DataSource.createEmpty<string>();

  private _isOpen = false;
  private _controlValue = '';
  private _optionClickInProgress = false;
  private _lastBlurEvent: FocusEvent | null = null;

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

  public handleFieldMouseDown(): void {
    if (!this.controlFocused) {
      return;
    }

    if (this._isOpen) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  public handleFieldFocus(): void {
    this.focus.emit();
    this.markControlAsFocused();
    this.openPanel();
  }

  public handleFieldBlur(event: FocusEvent): void {
    this._lastBlurEvent = event;

    if (this._optionClickInProgress) {
      return;
    }

    this.closePanel();
    this.blur.emit(event);
    this.handleControlBlur();
    this.markControlAsUnfocused();
    this.cdRef.markForCheck();
  }

  protected openPanel(): void {
    this._isOpen = true;
  }

  protected closePanel(): void {
    this._isOpen = false;
  }

  protected handleOptionMouseDown(): void {
    this._optionClickInProgress = true;
  }

  protected handleOptionMouseUp(option: DataSourceOption<string>): void {
    if (this._controlValue !== option.value) {
      this._controlValue = option.value;
      this.onChange(this._controlValue);
    }

    this._optionClickInProgress = false;
    this.optionClick.emit();

    if (this._lastBlurEvent !== null) {
      this.handleFieldBlur(this._lastBlurEvent);
    }
  }
}
