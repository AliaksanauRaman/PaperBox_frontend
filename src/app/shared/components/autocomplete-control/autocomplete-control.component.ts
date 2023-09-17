import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, BehaviorSubject, takeUntil, tap } from 'rxjs';

import { UniqueIdGeneratorService } from '../../../core/services/unique-id-generator.service';

import { CustomControl } from '../../abstracts/custom-control.class';
import { DataSourceOption } from '../../classes/data-source-option.class';
import { DataSource } from '../../classes/data-source.class';
import { Place } from '@shared/types/place';

@Component({
  selector: 'app-autocomplete-control',
  templateUrl: './autocomplete-control.component.html',
  styleUrls: ['./autocomplete-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteControlComponent
  extends CustomControl<string>
  implements OnInit
{
  @Input()
  public set label(value: string) {
    this.controlLabel = value;
  }

  @Input()
  public set dataSource(value: DataSource<string>) {
    this._dataSource = value;
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

  public get isPanelOpen(): boolean {
    return this._isPanelOpen;
  }

  public get isClearButtonShown(): boolean {
    return this._isClearButtonShown;
  }

  private readonly _inputValue$ = new BehaviorSubject<string>('');
  public readonly inputValue$ = this._inputValue$.asObservable();
  public readonly filteredOptions$ = this.inputValue$.pipe(
    map((inputValue) => {
      if (inputValue === '' || inputValue === null) {
        return this._dataSource.options;
      }

      return this._dataSource.options.filter((option) => {
        return option.label.toLowerCase().includes(inputValue.toLowerCase());
      });
    })
  );

  protected controlValue = '';
  protected controlWarningColored = false;
  protected readonly _Place = Place;

  @ViewChild('inputRef')
  private readonly inputElementRef!: ElementRef<HTMLInputElement>;

  private isInitialFocus = true;
  private isProgrammaticFocus = false;
  private _dataSource = new DataSource<string>([]);
  private _isPanelOpen = false;
  private _isClearButtonShown = false;

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef,
    private readonly elementRef: ElementRef
  ) {
    super(uniqueIdGeneratorService, cdRef);
  }

  @HostListener('document:mousedown', ['$event'])
  private handleDocumentMousedown(event: MouseEvent): void {
    const target = event.target;

    if (!(target instanceof Element)) {
      throw new Error('Wrong target!');
    }

    if (
      this.elementRef.nativeElement.contains(target) ||
      target.closest('div.autocomplete-control-pane') !== null
    ) {
      return;
    }

    this.hideClearButton();
    this.closePanel();
  }

  public ngOnInit(): void {
    this.inputValue$
      .pipe(
        tap((inputValue) => {
          if (inputValue === '') {
            this.hideClearButton();
          } else if (!this.isClearButtonShown && this.controlFocused) {
            this.showClearButton();
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public writeValue(value: unknown): void {
    if (typeof value !== 'string' && value !== null) {
      throw new Error('Wrong value!');
    }

    if (value === '' || value === null) {
      const nextControlValue = '';

      if (this.isNewControlValue(nextControlValue)) {
        this.updateControlValue(nextControlValue);
      }

      this.updateInputValue('');
    } else {
      if (this.isNewControlValue(value)) {
        this.updateControlValue(value);
      }

      this.updateInputValue(this._dataSource.getOptionByValue(value).label);
    }
  }

  public override setDisabledState(isDisabled: boolean): void {
    if (this.isPanelOpen) {
      this.closePanel();
    }

    super.setDisabledState(isDisabled);
  }

  public handleInputValueChange(value: string): void {
    if (!this.isPanelOpen) {
      this.openPanel();
    }

    const nextControlValue = '';

    if (this.isNewControlValue(nextControlValue)) {
      this.emitControlValueChange(nextControlValue);
      this.updateControlValue(nextControlValue);
    }

    this.updateInputValue(value);
  }

  public handleOptionSelect(option: DataSourceOption<string>): void {
    const nextControlValue = option.value;

    if (this.isNewControlValue(nextControlValue)) {
      this.emitControlValueChange(nextControlValue);
      this.updateControlValue(nextControlValue);
    }

    this.updateInputValue(option.label);
    this.closePanel();
    this.cdRef.markForCheck();
    this.focusInputElement();
  }

  public handleInputClick(): void {
    if (this.isPanelOpen) {
      return;
    }

    this.openPanel();
  }

  public handleInputFocus(): void {
    if (this.isInitialFocus) {
      this.isInitialFocus = false;
      this.openPanel();
    } else if (!this.isProgrammaticFocus) {
      this.openPanel();
    }

    this.isProgrammaticFocus = false;

    if (!this.controlFocused) {
      this.markControlAsFocused();
    }

    if (this._inputValue$.getValue() !== '' && !this.isClearButtonShown) {
      this.showClearButton();
    }
  }

  public handleInputBlur(event: FocusEvent): void {
    const { relatedTarget } = event;

    if (
      relatedTarget !== null &&
      // An edge case
      !(relatedTarget as HTMLElement).classList.contains('cdk-dialog-container')
    ) {
      this.hideClearButton();
      this.closePanel();
    }

    this.markControlAsUnfocused();
    this.handleControlBlur();
  }

  public handleClearButtonClick(): void {
    const nextControlValue = '';

    if (this.isNewControlValue(nextControlValue)) {
      this.emitControlValueChange(nextControlValue);
      this.updateControlValue(nextControlValue);
    }

    this.updateInputValue('');
    this.focusInputElement();
    this.openPanel();
    this.hideClearButton();
  }

  protected openPanel(): void {
    this._isPanelOpen = true;
  }

  protected closePanel(): void {
    this._isPanelOpen = false;
  }

  private focusInputElement(): void {
    this.isProgrammaticFocus = true;
    this.inputElementRef.nativeElement.focus();
  }

  private updateInputValue(newValue: string): void {
    this._inputValue$.next(newValue);
  }

  private isNewControlValue(nextValue: string): boolean {
    return this.controlValue !== nextValue;
  }

  private emitControlValueChange(nextValue: string): void {
    this.onChange(nextValue);
  }

  private updateControlValue(newValue: string): void {
    this.controlValue = newValue;
  }

  private showClearButton(): void {
    this._isClearButtonShown = true;
  }

  private hideClearButton(): void {
    this._isClearButtonShown = false;
  }
}
